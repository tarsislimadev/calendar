
const Base = {}

Base.append = (tuple, content) => {
  console.log('Base.append', { tuple, content })
}

class FormConstructor {
  fields = []

  with(fields = {}) {
    this.fields = this.fields
      .concat(Object.keys(fields).map((key) => ({ key, value: fields[key] })))

    return this
  }

  validate(vlds) {
    // TODO: finalizar implementação
  }
}

const Forms = new FormConstructor

const Validations = {
  required: (value, errorMessage = '') => 'required',
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
    // .catch(() => {    })
