
const Base = {}

Base.name = (name) => ['base', name].join('.')

Base.get = (name) => {
  const table = JSON.parse(localStorage.getItem(Base.name(name)))
  if (!table) return []
  return table.filter((item) => !!item)
}

Base.append = (tuple, content) => {
  const data = Base.get(tuple, [])
  console.log({ content })
  data.push(content)
  localStorage.setItem(
    Base.name(tuple),
    JSON.stringify(data)
  )
}

class FormConstructor {
  fields = []

  with(fields = {}) {
    this.fields = this.fields
      .concat(Object.keys(fields).map((key) => ({ key, value: fields[key] })))

    return this
  }

  validate(vlds) {
    return new Promise((s, _) => s()) // FIXME
  }
}

const Forms = new FormConstructor

class FlowConstructor {

  goTo(page) {
    if (!page) throw new Error('Page error')
    window.location = page
  }

}

const Flow = new FlowConstructor

const Validations = {
  required: (value, errorMessage = 'Required field.') => !value ? errorMessage : 'Required',
}

const Api = {}

Api.create = ({ where, who, start_date, end_date, why }) =>
  Forms.with({ where, who, start_date, end_date, why })
    .validate({
      where: [Validations.required(),],
      who: [Validations.required(),],
      start_date: [Validations.required(),],
      end_date: [Validations.required(),],
      why: [Validations.required(),],
    })
    .then(() => Base.append('events', { where, who, start_date, end_date, why }))

Api.list = () => Promise.resolve(Base.get('events'))
