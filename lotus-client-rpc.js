class LotusClientRPC {
  constructor (provider, { schema }) {
    this.provider = provider
    this.schema = schema
    return new Proxy(this, {
      get: (obj, prop) => {
        if (prop in obj) {
          return obj[prop]
        } else {
          const method = prop.charAt(0).toUpperCase() + prop.slice(1)
          const schemaMethod = schema.methods[method]
          if (schemaMethod) {
            if (schemaMethod.subscription) {
              return this.callSchemaMethodSub.bind(this, method, schemaMethod)
            } else {
              return this.callSchemaMethod.bind(this, method, schemaMethod)
            }
          } else {
            // FIXME: throw?
            console.warn(`Unknown method ${method}`)
          }
        }
      }
    })
  }

  async callSchemaMethod (method, schemaMethod, ...args) {
    await this.provider.connect()
    const request = {
      method: `Filecoin.${method}`
    }
    request.params = args
    return this.provider.send(request, schemaMethod)
  }

  callSchemaMethodSub (method, schemaMethod, ...args) {
    // await this.provider.connect()
    const request = {
      method: `Filecoin.${method}`
    }
    const cb = args[0]
    request.params = args.slice(1)
    return this.provider.sendSubscription(request, schemaMethod, cb)
  }

  async import (body) {
    return this.provider.import(body)
  }

  async destroy () {
    await this.provider.destroy()
  }
}

export default LotusClientRPC
