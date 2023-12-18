import { HTML, nButton } from '@brtmvdl/frontend'
import { Component } from './component.js'
import * as FLOW from '../utils/flow.js'
import * as Local from '../utils/local.js'

export class EventComponent extends Component {
  children = {
    how: new HTML(),
    what: new HTML(),
    when_ends: new HTML(),
    when_starts: new HTML(),
    where: new HTML(),
    who: new HTML(),
    update_button: new nButton(),
    delete_button: new nButton(),
  }

  onCreate() {
    this.setStyle('margin-bottom', '1rem')
    this.append(this.getHow())
    this.append(this.getWhat())
    this.append(this.getWhenStarts())
    this.append(this.getWhenEnds())
    this.append(this.getWhere())
    this.append(this.getWho())
    this.append(this.getUpdateButton())
    this.append(this.getDeleteButton())
  }

  getHow() {
    this.children.how.setText(this.model.how)
    return this.children.how
  }

  getWhat() {
    this.children.what.setText(this.model.what)
    return this.children.what
  }

  getWhenEnds() {
    this.children.when_ends.setText(this.model.when_ends)
    return this.children.when_ends
  }

  getWhenStarts() {
    this.children.when_starts.setText(this.model.when_starts)
    return this.children.when_starts
  }

  getWhere() {
    this.children.where.setText(this.model.where)
    return this.children.where
  }

  getWho() {
    this.children.who.setText(this.model.who)
    return this.children.who
  }

  getUpdateButton() {
    this.children.update_button.setText('update')
    this.children.update_button.on('click', () => FLOW.goTo('/edit/', this.model))
    return this.children.update_button
  }

  getDeleteButton() {
    this.children.delete_button.setText('delete')
    this.children.delete_button.on('click', () => {
      Local.get(['events']).then((events) => {
        Local.set(['events'], Array.from(events).filter((_, id) => id != this.model.id))
        FLOW.goTo('?')
      })
    })
    return this.children.delete_button
  }

}
