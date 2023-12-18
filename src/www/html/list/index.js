import { HTML, nButton, nError, PageTop } from '../components/index.js'
import { EventComponent } from '../components/event.js'
import { EventModel } from '../models/event.js'
import * as FLOW from '../utils/flow.js'
import * as API from '../utils/api.js'

class Container extends HTML {
  onCreate() {
    this.setStyle('margin', '0 auto')
    this.setStyle('width', '40rem')
  }
}

class nFloattingButton extends nButton {
  onCreate() {
    super.onCreate()

    this.setContainerStyle('position', 'fixed')
    this.setContainerStyle('bottom', '2rem')
    this.setContainerStyle('right', '2rem')

    this.setStyle('background-color', '#000000')
    this.setStyle('display', 'inline-block')
    this.setStyle('border-radius', '50%')
    this.setStyle('color', '#ffffff')
    this.setStyle('border', 'none')
    this.setStyle('height', '2rem')
    this.setStyle('width', '2rem')
  }
}

export class Page extends HTML {
  children = {
    createButton: new nFloattingButton(),
    list: new HTML(),
    error_message: new nError(),
  }

  state = {
    list: [],
  }

  onCreate() {
    this.append(new PageTop())
    this.append(this.getCreateButton())
    this.append(this.getListHTML())
    this.updateListState()
  }

  getCreateButton() {
    this.children.createButton.setText('+')
    this.children.createButton.on('click', () => FLOW.goTo('/edit/', {}))
    return this.children.createButton
  }

  getListHTML() {
    const container = new Container()
    container.append(this.children.list)
    return container
  }

  setList(list = []) {
    this.state.list = list
    return this
  }

  updateListHTML() {
    this.children.list.clear()

    Array.from(this.state.list)
      .map((model) => new EventComponent(model))
      .map((item) => this.children.list.append(item))

    return this
  }

  updateListState() {
    this.setList([])

    API.listEvents()
      .then((arr) => Array.from(arr).map((res, id) => new EventModel({ ...res, id })))
      .then((arr) => this.setList(arr))
      .then(() => this.updateListHTML())
      .catch((err) => this.children.error_message.setText(err.message))
  }

}
