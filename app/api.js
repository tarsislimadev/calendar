
const Base = {}

Base.retrieve = (name, ix = null) => {
  const table = JSON.parse(localStorage.getItem(name))
  if (!table) return []
  const list = table.filter((item) => !!item).map((item, ix) => {
    item._id = ix
    return item
  })

  if (ix !== null) return list[ix]
  return list
}

Base.append = (name, content) => {
  const data = Base.retrieve(name)
  data.push(content)
  localStorage.setItem(name, JSON.stringify(data))
}

Base.replace = (name, identifier, content) => {
  const data = Base.retrieve(name)
  const newData = []

  console.log({ data })

  for (let i = 0; i < data.length; i++) {
    if (i === identifier) { newData[identifier] = content }
    else { newData[identifier] = data[i] }
  }

  localStorage.setItem(name, JSON.stringify(newData))
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
