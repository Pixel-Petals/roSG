
import path from 'path'
import fs from 'fs-extra'
import renderLottie from 'puppeteer-lottie'
import { createCanvas, Image } from 'canvas'
import { glob } from 'glob'
import { Cache, __cachepath } from './cache.js'
import fileLoader from './file.js'

/***************************************

  Lottie

***************************************/

export class Lottie {

  /***************************************
  Static
  ***************************************/

  // Static Methods

  /**
   * export
   *
   * @param {*} { file, uri, data }
   */

  static async export({
    file, uri, data, // input data
    outDir // export settings
  }) {

    const lottie = new Lottie()
    await lottie.load({ file, uri, data })
    await lottie.export({ outDir })

  }

  /***************************************
  Instance
  ***************************************/

  // Instance Properties

  uri = ''
  name = ''

  // Private
  //--------------------------------------

  #cache = new Cache()

  #json = {}
  #frames = {
    total: 0,
    sheetWidth: 0,
    sheetHeight: 0,
    xFrames: 0,
    yFrames: 0,
    frameWidth: 0,
    frameHeight: 0,
  }

  #SCALE_FACTOR = 3
  #SHEET_FILE = `sheet.png`

  #FRAMES_SUBDIR = `frames`
  #FRAME_FILE_FORMAT = `frame-%04d.png`
  #FRAME_FILE_PATTERN = `frame-*.png`

  // Instance Methods

  /**
   * load
   *
   * @param {*} param0
   */

  async load({ file, uri, data }) {

    let json = data || await fileLoader.load({ file, uri })
    this.#json = json

    const totalFrames = json.op - json.ip
    const frameHeight = (json.h || 0) * this.#SCALE_FACTOR
    const frameWidth = (json.w || 0) * this.#SCALE_FACTOR

    const framesRoot = Math.sqrt(totalFrames) // e.g. √12 => 3.46

    const xFrames = Math.ceil(framesRoot) // 3.46 => 4
    const yFrames = (xFrames ^ 2) == totalFrames
      ? xFrames
      : xFrames - 1 // 4*4 => 12; 4 rows X 4 cols

    const sheetHeight = yFrames * frameHeight
    const sheetWidth = xFrames * frameWidth

    this.#frames = {
      total: totalFrames,
      sheetHeight,
      sheetWidth,
      xFrames,
      yFrames,
      frameHeight,
      frameWidth,
    }

  }

  /**
   * export
   *
   * @param {*} param0
   */

  async export({ outDir, outName, optimize }) {

    const frames = await exportFrames({ outDir, outName, optimize })
    await exportTilesheet({ outDir, outFrames: frames })

  }

  /**
   * exportFrames
   *
   * @param {*} param0
   */

  async exportFrames({ outDir, outName, optimize }) {
    outDir = outDir || `${process.cwd()}/out/${this.name}`
    outName = outName || this.name
    optimize = optimize || false

    fs.rmSync(outDir, { recursive: true, force: true })

    const outFrames = path.join(outDir, this.#FRAMES_SUBDIR)

    fs.mkdirSync(outDir)
    fs.mkdirSync(outFrames)

    await renderLottie({
      renderer: 'svg',
      animationData: this.#json,
      output: path.join(outFrames, this.#FRAME_FILE_FORMAT),
      deviceScaleFactor: this.#SCALE_FACTOR,
    })

    await this.#exportTilesheet({
      outDir: outDir,
      outFrames: `${outDir}/${this.#FRAMES_SUBDIR}`
    })

  }

  async #exportTilesheet({ outDir, outFrames } = {}) {

    const framesGlobPattern = `${outFrames}/${this.#FRAME_FILE_PATTERN}`
    let frames = await glob(framesGlobPattern, { withFileTypes: true })

    frames = frames.sort((a, b) => {
      return a.fullpath().localeCompare(b.fullpath(), 'en', { numeric: true })
    })

    const canvas = createCanvas(this.#frames.sheetWidth, this.#frames.sheetHeight)
    const draw2d = canvas.getContext('2d')

    let offset = {
      x: 0,
      y: 0,
    }

    console.log(this.#frames)

    let i = 1
    for await (const frame of frames) {

      const frameImg = await fileLoader.load(frame.fullpath())
      draw2d.drawImage(frameImg, offset.x, offset.y)

      offset.x += this.#frames.frameWidth
      if ((i % this.#frames.xFrames) == 0) {

        offset.x = 0
        offset.y += this.#frames.frameHeight

      }

      i++
    }

    const buffer = canvas.toBuffer('image/png')
    await fs.writeFile(`${outDir}/${this.#SHEET_FILE}`, buffer)

  }

}