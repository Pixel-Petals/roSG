
export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

export function isArray(value) {
  return Array.isArray(value)
}

export function isMap(value) {
  return typeof value === 'map' || value instanceof Map
}

export function isObject(value) {
  return typeof value === 'object' || value instanceof Object
}

export function map(iterable) {

  if (isObject(iterable)) {
    return new Map(Object.entries(iterable))
  }

  return new Map(iterable)

}

export function isFunc(value) {
  return typeof value === 'function' || value instanceof Function
}

export function isClass(value) {
  return isFunc(value) && /^\s*class\s+/.test(value.toString())
}