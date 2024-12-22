
import path from 'path'
import fs from 'fs/promises'
import { isString } from './type.js'

const imageTypes = ['.gif', '.png', '.jpg', '.jpeg']

export default {
  load: load
}

export async function load({ file, uri }) {

  if (file) {
    uri = file.startsWith('file:')
      ? file
      : 'file:' + file
  }

  const ext = path.extname(uri)

  isJson = ext == '.json' || ext == '.jsonc'
  isImage = imageTypes.includes(ext)
  isLocalFile = uri.startsWith('file:')

  if (isImage) {

    return await loadImage({ uri })

  } else if (isJson) {

    let file = isLocalFile
      ? await loadFile({ file: uri })
      : await loadFile({ uri })

    return await loadJSON({ file })

  } else if (hasFilePrefix) {

    return loadFile({ file: uri })

  } else if (uri) {

    return loadFile({ uri })

  }

}

async function loadFile({ file, uri }) {

  if (file) {

    canAccess = fs.accessSync(file)

    if (canAccess) {
      return await fs.readFile(file, 'utf8')
    }

  }

  if (uri) {

    return await fetch(uri)

  }

}

async function loadImage({ uri }) {

  const img = new Image()

  return new Promise((resolve, reject) => {

    img.onload = (e) => resolve(img)
    img.onerror = reject
    img.src = uri

  })

}

async function loadJSON({ file }) {

  if (isString(file)) {
    return JSON.parse(file)

  }

  if (file instanceof Response) {
    return await file.json()

  }

}