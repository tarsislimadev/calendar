
const Params = {}

Params.get = (name) =>
  JSON.parse(localStorage.getItem(['params', name].join('.')))

Params.set = (name, value) =>
  localStorage.setItem(['params', name].join('.'), JSON.stringify(value))

const Base = {}

Base.retrieve = (name) => {
  const table = JSON.parse(localStorage.getItem(['base', name].join('.')))
  if (!table) return []
  return table
    .filter((item) => !!item)
    .map((item, ix) => {
      item._id = ix
      return item
    })
}

Base.setItem = (name, data) =>
  localStorage.setItem(['base', name].join('.'), JSON.stringify(data))

Base.append = (name, data) => {
  const arr = Base.retrieve(name)
  arr.push(data)
  Base.setItem(name, arr)
}

Base.replace = (name, id, data) => {
  const arr = Base.retrieve(name)
  const _arr = arr.map((obj) => obj._id === id ? data : obj)
  Base.setItem(name, _arr)
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

  goTo(name) {
    if (!name) throw new Error('Page error')
    window.location = name
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

Api.list = () => Promise.resolve(Base.retrieve('events'))

Api.get = (tuple, ix = 0) => {
  const list = Base.retrieve(tuple)

  if (!(list && list.length)) {
    return null
  }

  return list[ix]
}

Api.update = (id, { where, who, start_date, end_date, why }) =>
  Forms.with({ where, who, start_date, end_date, why })
    .validate({
      where: [Validations.required(),],
      who: [Validations.required(),],
      start_date: [Validations.required(),],
      end_date: [Validations.required(),],
      why: [Validations.required(),],
    })
    .then(() => Base.replace('events', id, { where, who, start_date, end_date, why }))
