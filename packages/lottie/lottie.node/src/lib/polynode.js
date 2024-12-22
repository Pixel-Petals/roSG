
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'

export const require = createRequire(import.meta.url)
export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

import { findInParentDirs, findInSubDirs } from './polypath.js'

export const __packagename = 'package.json'
export const __packagepath = findInParentDirs({
  target: __packagename,
  search: __dirname,
  returnParentDir: true
})

export const __package = require(path.join(__packagepath, __packagename))

export const __modulesname = 'node_modules'
export const __modulespath = findInSubDirs({
  target: __modulesname,
  search: __packagepath,
})

export const __cachepath = path.join(__modulespath, '.cache', __package.name)