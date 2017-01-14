import extend from 'extend'
import path from 'path'

import hooksDefault from '../../hooks/hooks'

import {
  config
  ,coreUtils
  ,abeExtend
} from '../'

import * as abe from '../'

let singleton = Symbol()
let singletonEnforcer = Symbol()

class Hooks {

  constructor(enforcer) {
    if(enforcer != singletonEnforcer) throw 'Cannot construct Json singleton'

    if(coreUtils.file.exist(path.join(config.root, config.hooks.url, 'hooks.js'))){
      var h = require(path.join(config.root, config.hooks.url, 'hooks.js'))
      this.fn = extend(true, hooksDefault, h.default)
    }
    else{
      this.fn = hooksDefault
    }
  }

  trigger() {
    if(arguments.length > 0) {
      var args = [].slice.call(arguments)
      var fn = args.shift()
      args.push(abe)
      
      if(typeof this.fn !== 'undefined' && this.fn !== null
        && typeof this.fn[fn] !== 'undefined' && this.fn[fn] !== null) {
        args[0] = this.fn[fn].apply(this, args)
      }

      args[0] = abeExtend.plugins.instance.hooks.apply(abeExtend.plugins.instance, [fn].concat(args))
    } else {
      args = ['']
    }

    return args[0]
  }

  static get instance() {
    if(!this[singleton]) {
      this[singleton] = new Hooks(singletonEnforcer)
    }
    return this[singleton]
  }
}

export default Hooks