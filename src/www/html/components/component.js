import { HTML } from '@brtmvdl/frontend'

export class Component extends HTML {
  model = null

  constructor(model = {}) {
    super()
    //
    this.model = model
  }
}
