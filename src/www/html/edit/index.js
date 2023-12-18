import { HTML, nError, nInputTextGroup, nButton, PageTop } from '../components/index.js'
import { EventModel } from '../models/index.js'
import * as FLOW from '../utils/flow.js'
import * as API from '../utils/api.js'

export class Page extends HTML {
  children = {
    page_title: new HTML(),
    error_message: new nError(),
    what: new nInputTextGroup(),
    when_starts: new nInputTextGroup(),
    when_ends: new nInputTextGroup(),
    who: new nInputTextGroup(),
    where: new nInputTextGroup(),
    how: new nInputTextGroup(),
    save_button: new nButton(),
  }

  state = {
    id: null,
    data: new EventModel(),
  }

  onCreate() {
    this.append(new PageTop())
    this.append(this.getErrorMessage())
    this.append(this.getPageTitle())
    this.append(this.getWhatInput())
    this.append(this.getWhenStartstInput())
    this.append(this.getWhenEndstInput())
    this.append(this.getWhoInput())
    this.append(this.getWhereInput())
    this.append(this.getHowInput())
    this.append(this.getSaveButton())
    //
    this.retrieveData()
  }

  getErrorMessage() {
    return this.children.error_message
  }

  getPageTitle() {
    this.children.page_title.setText('Create')
    this.children.page_title.setStyle('font-size', '2rem')
    return this.children.page_title
  }

  getWhatInput() {
    this.children.what.children.label.setText('what')
    return this.children.what
  }

  getWhenStartstInput() {
    this.children.when_starts.children.label.setText('when starts')
    return this.children.when_starts
  }

  getWhenEndstInput() {
    this.children.when_ends.children.label.setText('when ends')
    return this.children.when_ends
  }

  getWhoInput() {
    this.children.who.children.label.setText('who')
    return this.children.who
  }

  getWhereInput() {
    this.children.where.children.label.setText('where')
    return this.children.where
  }

  getHowInput() {
    this.children.how.children.label.setText('how')
    return this.children.how
  }

  getInputValue(input) {
    return this.children[input].children.input.getValue()
  }

  getSaveButton() {
    this.children.save_button.setText('save')
    this.children.save_button.on('click', () => {
      this.children.error_message.clear()

      const event = new EventModel()

      event.id = this.state.id
      event.what = this.getInputValue('what')
      event.when_starts = this.getInputValue('when_starts')
      event.when_ends = this.getInputValue('when_ends')
      event.who = this.getInputValue('who')
      event.where = this.getInputValue('where')
      event.how = this.getInputValue('how')

      API.saveEvent(event)
        .then(() => FLOW.goTo('/list/'))
        .catch((err) => this.children.error_message.setText(err.message))
    })

    return this.children.save_button
  }

  retrieveData() {
    FLOW.getData().then((data = new EventModel()) => {
      this.state.id = data?.id
      this.children.what.children.input.setValue(data?.what)
      this.children.when_starts.children.input.setValue(data?.when_starts)
      this.children.when_ends.children.input.setValue(data?.when_ends)
      this.children.who.children.input.setValue(data?.who)
      this.children.where.children.input.setValue(data?.where)
      this.children.how.children.input.setValue(data?.how)
    })
  }
}
