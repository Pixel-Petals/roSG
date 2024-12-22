
import { isClass, isObject } from "../type.js"

export function Handler(handler) {

  const defaults = {
    defineProperty: null,
    deleteProperty: null,
    set: null,
    get: null,
    apply: null,
    construct: null,
    getOwnPropertyDescriptor: null,
    getPrototypeOf: null,
    has: null,
    isExtensible: null,
    ownKeys: null,
    preventExtensions: null,
    setPrototypeOf: null,
  }

  return {
    ...defaults,
    ...handler,
  }

}

class BaseClass {

  constructor(returnVal = null) {
    if (returnVal) { return returnVal }
  }

}

export function Mixin(mixins = [], baseclass = BaseClass) {

  if (isClass(baseclass)) {

    let mixed = baseclass

    for (const nextMixin in mixins) {
      mixed = nextMixin(mixed)
    }

    return mixed

  } else if (isObject(baseclass)) {

    let mixed = baseclass

    for (const nextMixin of mixins) {
      mixed = Object.assign(mixed, new nextMixin())
    }

    return mixed

  }

}

export function ProxyMixin(baseclass = BaseClass) {

  return class extends baseclass {

    #proxy = null

    proxy(handler) {
      this.#proxy = Proxy.revocable(this, handler)
      return this.#proxy
    }

    revokeProxy() {
      this.#proxy.revoke()
    }

  }

}