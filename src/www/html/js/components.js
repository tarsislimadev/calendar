
class nComponent extends nTag {
}

class nInputTextComponent extends nComponent {
  label = new nLabel()
  input = new nInputText()
  error = new nError()

  constructor() {
    super({
      component: { name: 'input-text-component' },
    })

    this.append(this.label)
    this.append(this.input)
    this.append(this.error)
  }
}

class nInputDateTimeComponent extends nComponent {
  label = new nLabel

  flex = new nFlex

  input_date = new nInputDate
  input_time = new nInputTime

  error = new nError

  constructor() {
    super({
      component: { name: 'input-datetime-component' }
    })

    this.append(this.label)

    this.flex.append(this.input_date)

    const sep = new nText()
    sep.setContainerStyle('width', '1rem')
    sep.setStyle('text-align', 'center')
    sep.setStyle('padding', '0.5rem 0')
    sep.setStyle('width', '1rem')
    this.flex.append(sep)

    this.flex.append(this.input_time)

    this.append(this.flex)

    this.append(this.error)
  }

  getValue() {
    return [
      this.input_date.getValue(),
      this.input_time.getValue()
    ].join(' ')
  }

  setValue(value = ['', '']) {
    const [yday, smonth, syear, shour, sminutes] = (value || '').split(' ')
    this.input_date.setValue([yday, smonth, syear].join(' '))
    this.input_time.setValue([shour, sminutes].join(' '))
    return this
  }
}

class nRadioGroup extends nTag {
  label = new nLabel
  flex = new nFlex
  error = new nError

  constructor() {
    super({
      component: { name: 'radio-group' },
    })

    this.append(this.label)
    this.append(this.flex)
    this.append(this.error)
  }

  addRadio(name, value) {
    const radio = new nTag()

    radio.setData('value', value)
    radio.setText(name)

    radio.setContainerStyle('width', '5rem')
    radio.setContainerStyle('height', '2rem')
    radio.setContainerStyle('line-height', '2rem')
    radio.setContainerStyle('text-align', 'center')

    radio.setStyle('background-color', '#000000')
    radio.setStyle('padding', '1rem')

    this.flex.append(radio)
    return radio
  }
}

class nListComponent extends nTag {

  list = []
  renderable = () => (new nError).setText('no one renderable')

  constructor() {
    super({
      component: { name: 'list-component' }
    })
  }

  push(data = {}) {
    const self = this
    self.list.push(data)
    self.clear()
    self.list.map((item) => self.append(self.renderable(item)))
    return self
  }

  setRenderable(renderable) {
    this.renderable = renderable
    return this
  }

  getRenderable() {
    return this.renderable || (() => new nText().setText('no draw'))
  }
}

