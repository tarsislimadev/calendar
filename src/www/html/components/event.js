import { HTML } from '@brtmvdl/frontend'
import { Component } from './component.js'

export class EventComponent extends Component {
  children = {
    how: new HTML(),
    what: new HTML(),
    when_ends: new HTML(),
    when_starts: new HTML(),
    where: new HTML(),
    who: new HTML(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getHow())
    this.append(this.getWhat())
    this.append(this.getWhenStarts())
    this.append(this.getWhenEnds())
    this.append(this.getWhere())
    this.append(this.getWho())
  }

  setStyles() {
    this.setStyle('margin-bottom', '1rem')
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
}
