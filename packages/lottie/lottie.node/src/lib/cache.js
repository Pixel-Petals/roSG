
import { existsSync } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import {
  __package,
  __modulespath,
  __cachepath,
} from './polynode.js'

import fileLoader from './file.js'

export { __cachepath }

export class Cache {

  path = __cachepath
  data = null

  formatCacheKey(key) { return `${key}.json` }

  async save({ key, data, cachePath }, write = fs.writeFile) {

    cachePath = cachePath || __cachepath

    if (!existsSync(cachePath)) {
      fs.mkdirSync(cachePath, { recursive: true })
    }

    const filepath = path.join(cachePath, formatCacheKey(key))
    await write(filepath, data)

  }

  async clear({ key, cachePath }) {

    cachePath = cachePath || __cachepath
    const filepath = path.join(cachePath, formatCacheKey(key))

    await fs.unlink(filepath)

  }

  async load({ key, cachePath }) {

    cachePath = cachePath || __cachepath
    const filepath = path.join(cachePath, formatCacheKey(key))

    this.data = await fileLoader.load(filepath)
    return this.data

  }

}