
class nTag {
  container = document.createElement('div')
  element = document.createElement('div')

  options = {
    element: {
      tagName: 'div',
    },
    container: {
      tagName: 'div',
    },
    component: {
      name: 'bug',
    }
  }

  constructor(options) {
    this.options = {
      ...this.options,
      ...options,
    }

    this.build()
  }

  build() {
    if (this.options.element.tagName) {
      this.element = document.createElement(this.options.element.tagName)
    }

    if (this.options.container.tagName) {
      this.container = document.createElement(this.options.container.tagName)
    }

    if (this.options.component.name) {
      this.element.classList.add(`el-${this.options.component.name}`)
      this.container.classList.add(`ct-${this.options.component.name}`)
    }

    this.makeStyle()
  }

  makeStyle() {
    this.setStyle('margin', '0')
    this.setStyle('padding', '0')
    this.setStyle('outline', 'none')
    this.setStyle('border', 'none')
    this.setStyle('box-sizing', 'border-box')
  }

  static fromElement(el = document.createElement('')) {
    const bug = new nTag()
    bug.element = el
    return bug
  }

  static fromId(id) {
    return nTag.fromElement(document.getElementById(id))
  }

  setContainerStyle(name, value) {
    this.container.style[name] = value
    return this
  }

  getContainerStyle(name) {
    return this.container.style[name]
  }

  setStyle(name, value) {
    this.element.style[name] = value
    return this
  }

  getStyle(name) {
    return this.element.style[name]
  }

  setAttr(name, value) {
    this.element.setAttribute(name, value)
    return this
  }

  getAttr(name) {
    return this.element.getAttribute(name)
  }

  setText(value) {
    this.element.innerText = value
    return this
  }

  getText() {
    return this.element.innerText
  }

  on(name, value) {
    this.element.addEventListener(name, value.bind(this))
    return this
  }

  once(name, value) {
    this.element.addEventListener(name, value.bind(this), { once: true })
    return this
  }

  setData(name, value) {
    this.element.dataset[name] = value
    return this
  }

  getData(name) {
    return this.element.dataset[name]
  }

  clear() {
    while (this.element.children.length > 0) {
      this.element.children.item(0).remove()
    }

    return this
  }

  append(ntag = new nTag()) {
    this.element.append(ntag.render())
    return this
  }

  render() {
    this.container.append(this.element)
    return this.container
  }
}

class nMarginAuto extends nTag {
  constructor() {
    super({
      component: { name: 'margin-auto' },
    })

    this.setStyle('width', '40rem')
    this.setStyle('margin', '0 auto')
  }
}

class nH1 extends nTag {
  constructor() {
    super({
      component: { name: 'h1' },
    })

    this.setStyle('font-weight', 'bold')
    this.setStyle('font-size', '3rem')
  }
}

class nText extends nTag {
  constructor() {
    super({
      element: { tagName: 'p' },
      component: { name: 'text' },
    })
  }
}

class nNumber extends nTag {
  num = 0

  constructor() {
    super({
      element: { tagName: 'p' },
      component: { name: 'number' },
    })

    this.setNumber(this.num)
  }

  setText() {
    throw new Error('Can not do this.')
  }

  setNumber(num) {
    this.num = num
    super.setText(this.num)
    return this
  }

  add(num = 1) {
    this.num += num
    super.setText(this.num)
    return this
  }

  sub(num = 1) {
    this.num -= num
    super.setText(this.num)
    return this
  }
}

class nButton extends nTag {
  constructor() {
    super({
      element: { tagName: 'button' },
      component: { name: 'button' },
    })
  }
}

class nLink extends nTag {
  constructor() {
    super({
      element: { tagName: 'a' },
      component: { name: 'link' },
    })

    this.setStyle('text-decoration', 'none')
    this.setStyle('color', 'inherit')
    // this.setStyle('color', '#1f080a')
  }

  href(href) {
    this.setAttr('href', href)
    return this
  }
}

class nFlex extends nTag {
  constructor() {
    super({
      component: { name: 'flex' },
    })

    this.setStyle('display', 'flex')
    this.setStyle('justify-content', 'space-between')
  }
}

class nLabel extends nTag {
  constructor() {
    super({
      component: { name: 'label' },
    })
  }
}

class Valuable extends nTag {

  getValue() {
    return this.element.value
  }

  setValue(value) {
    this.element.value = value
  }

}

class nInputText extends Valuable {
  constructor() {
    super({
      component: { name: 'input-text' },
      element: { tagName: 'input' }
    })

    this.setAttr('type', 'text')

    this.makeStyle()
  }

  makeStyle() {
    const width = 'calc(100% - 1rem)'
    this.setContainerStyle('width', width)
    this.setStyle('width', width)

    this.setStyle('padding', '0.5rem')
  }
}

class nInputNumber extends Valuable {
  constructor() {
    super({
      component: { name: 'input-number' },
      element: { tagName: 'input' }
    })

    this.setAttr('type', 'number')

    const width = 'calc(100% - 1rem)'
    this.setContainerStyle('width', width)
    this.setStyle('width', width)

    this.setStyle('padding', '0.5rem')
  }
}

class nInputDate extends nTag {
  flex = new nFlex

  day = new nInputNumber
  month = new nInputNumber
  year = new nInputNumber

  constructor() {
    super({
      component: { name: 'input-date' }
    })

    this.flex.append(this.day)
    this.flex.append(this.makeSeparator('/'))
    this.flex.append(this.month)
    this.flex.append(this.makeSeparator('/'))
    this.flex.append(this.year)

    this.append(this.flex)
  }

  makeSeparator(text) {
    const sep = new nText()

    sep.setContainerStyle('width', '1rem')
    sep.setStyle('width', '1rem')

    sep.setStyle('text-align', 'center')
    sep.setStyle('padding', '0.5rem 0')

    sep.setText(text)

    return sep
  }

  getValue() {
    return [
      this.year.getValue(),
      this.month.getValue(),
      this.day.getValue(),
    ].join('-')
  }
}

class nInputTime extends nTag {
  flex = new nFlex

  hour = new nInputNumber
  minutes = new nInputNumber

  constructor() {
    super({
      component: { name: 'input-time' }
    })

    this.flex.append(this.hour)

    const sep = new nTag()
    sep.setText(':')
    sep.setContainerStyle('width', '1rem')
    sep.setStyle('text-align', 'center')
    sep.setStyle('padding', '0.5rem 0')
    sep.setStyle('width', '1rem')
    this.flex.append(sep)

    this.flex.append(this.minutes)

    this.append(this.flex)
  }

  getValue() {
    return [
      this.hour.getValue(),
      this.minutes.getValue()
    ].join(':')
  }
}

class nError extends nTag {
  constructor() {
    super({
      component: { name: 'error' },
    })

    this.setStyle('color', 'red')
  }
}

/// components ////

class nCenter extends nTag {
  constructor() {
    super({ component: { name: 'margin-auto' } })

    this.setStyle('margin', '0 auto')
    this.setStyle('width', '42rem')
  }
}

class nInputTextComponent extends nTag {
  label = new nLabel()
  input = new nInputText()
  error = new nError()

  constructor() {
    super({
      component: { name: 'input-text-component' },
    })


    this.label.setStyle('padding', '0.5rem 0')
    this.append(this.label)

    this.input.setStyle('padding', '0.5rem 0')
    this.input.setStyle('width', '100%')
    this.append(this.input)

    this.error.setStyle('padding', '0.5rem 0')
    this.append(this.error)
  }
}

class nInputDateTimeComponent extends nTag {
  label = new nLabel()

  flex = new nFlex

  input_date = new nInputDate()
  input_time = new nInputTime()

  error = new nError()

  constructor() {
    super({
      component: { name: 'input-datetime-component' },
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
}

class nRadioGroup extends nTag {
  label = new nLabel
  flex = new nFlex
  error = new nError

  constructor() {
    super({
      component: { name: 'radio-group' },
    })

    this.label.setStyle('margin-bottom', '0.5rem')
    this.append(this.label)

    this.flex.setStyle('margin-bottom', '0.5rem')
    this.append(this.flex)

    this.error.setStyle('margin-bottom', '0.5rem')
    this.append(this.error)
  }

  addRadio(name, value) {
    const radio = new nTag()

    radio.setData('value', value)
    radio.setText(name)

    this.flex.append(radio)
    return radio
  }
}
