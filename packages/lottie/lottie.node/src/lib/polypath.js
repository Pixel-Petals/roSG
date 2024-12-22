
import fs from 'fs'
import path from 'path'
import { isArray, isString, isObject } from './type.js'

export function getParentDir(source) {
  return path.dirname(source)
}

export function getSubDirs(source) {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}

export function findInParentDirs({ target, search, returnParentDir } = {}) {
  return find({ target, search, returnParentDir }, getParentDir)
}

export function findInSubDirs({ target, search, returnParentDir } = {}) {
  return find({ target, search, returnParentDir }, getSubDirs)
}

/**
 * find
 *
 * Iterates through folders to find a file or folder.
 *
 * @param {*} { search, target, returnParentDir }
 * @param {*} getNextDir
 * @returns
 */
function find({ search, target, returnParentDir }, getDirs = getSubDirs) {
  returnParentDir = returnParentDir || false
  if (!isArray(search)) { search = [search] }

  for (const searchPath of search) {

    let found = findRecurse({
      search: searchPath,
      target,
      returnParentDir,
    }, getDirs)

    if (found) {

      if (isString(found)) {
        return found
      }

      if (isObject(found)) {

        let targetPath = returnParentDir ? found.dirPath : found.targetPath
        return path.resolve(targetPath)

      }

    }

  }

  return null

}

function findRecurse({ search, target, returnParentDir }, getDirs) {

  //console.log(`Recurse ${search}`)

  const searchPath = path.join(search, target)

  // pass
  if (fs.existsSync(searchPath)) {

    // console.log(`FOUND TARGET AT ${searchPath}`)
    // console.log(search)
    // console.log('')
    return {
      dirPath: search,
      targetPath: searchPath,
    }

  }

  const nextDirs = getDirs(search)

  // fail
  if (!nextDirs || nextDirs.includes(search)) { return null }

  // recurse
  return find({

    search: nextDirs,
    target,
    returnParentDir,

  }, getDirs)

}