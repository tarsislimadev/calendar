import { HTML, nButton, PageTop } from '../components/index.js'
import * as FLOW from '../utils/flow.js'

export class Page extends HTML {
  children = {
    createButton: new nButton(),
  }

  onCreate() {
    this.append(new PageTop())
    this.append(this.getCreateButton())
  }

  getCreateButton() {
    this.children.createButton.setText('+')
    this.children.createButton.on('click', () => FLOW.goTo('/create/'))
    return this.children.createButton
  }
}
