
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

class AjaxResponse {
  xhr = {}

  constructor(xhr) {
    this.xhr = xhr
  }

  getResponse() {
    return JSON.parse(this.xhr.responseText)
  }

  getStatus() {
    return this.getResponse()['status']
  }

  getMessage() {
    return this.getResponse()['message']
  }

  getData() {
    return this.getResponse()['data']
  }

  getExtra() {
    return this.getResponse()['extra']
  }

}

class SuccessResponse extends AjaxResponse {
  get(name) {
    return this.getData()[name]
  }

  getArray(name) {
    return Array.from(this.get(name))
  }
}

class ErrorResponse extends AjaxResponse { }

const Ajax = {}

Ajax.servers = {}
Ajax.servers['default'] = {
  url: 'http://0.0.0.0/api/v1'
}

Ajax.post = (paths = [], data = {}) => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open('POST', paths.join('/'), true)

  const onComplete = (xhr) => [200, '200'].indexOf(xhr.status) !== -1
    ? resolve(new SuccessResponse(xhr))
    : reject(new ErrorResponse(xhr))

  xhr.onload = () => onComplete(xhr)
  xhr.onerror = () => onComplete(xhr)

  xhr.send(JSON.stringify(data))
})

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
    .then(() => Ajax.post([Ajax.servers.default.url, 'tasks', 'create'], { where, who, start_date, end_date, why }))

Api.list = () => Ajax.post([Ajax.servers.default.url, 'tasks', 'list'], {})

Api.get = ({ _id }) => Ajax.post([Ajax.servers.default.url, 'tasks', 'get'], { _id })

Api.update = (_id, { where, who, start_date, end_date, why }) => 
  Forms.with({ where, who, start_date, end_date, why })
    .validate({
      where: [Validations.required(),],
      who: [Validations.required(),],
      start_date: [Validations.required(),],
      end_date: [Validations.required(),],
      why: [Validations.required(),],
    })
    .then(() => Ajax.post([Ajax.servers.default.url, 'tasks', 'update'], { _id, where, who, start_date, end_date, why }))
