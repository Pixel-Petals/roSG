
import { Mixin, ProxyMixin } from './mixins/proxy.js'

export function Enum() {

  return this.proxy({

    defineProperty: (target, prop, value) => {
      console.log("ignore define")
    },

    set: (target, prop, value) => {
      console.log("ignore set")
    }

  })

}

export class Enums extends Mixin(ProxyMixin) {

  constructor(enums) {

    super(() => {
      Object.assign(this, enums)

    })

    return this.proxy()

  }

}