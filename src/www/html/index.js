import { HTML } from '../components/index.js'
import * as API from './utils/api.js'
import * as FLOW from './utils/flow.js'

export class Page extends HTML {
  onCreate() {
    API.setOn(false)
    //
    FLOW.goTo('/list/')
  }
}
