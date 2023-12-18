import * as config from '../config.js'

class Response { }

class SuccessResponse extends Response { }

class ErrorResponse extends Response {
  type = 'network'
}

const request = (method = 'GET', pathname = '/', headers = new Headers(), data = {}) => new Promise((s, f) => {
  const xhr = new XMLHttpRequest()
  xhr.open(method, [config.BASE_URL, pathname].join('/'), true)
  Array.from(headers).map(([key, value = '']) => xhr.setRequestHeader(key, value))

  const onComplete = () => {
    xhr.status === 200
      ? s(new SuccessResponse(xhr))
      : f(new ErrorResponse(xhr))
  }

  xhr.onload = () => onComplete()
  xhr.onerror = () => onComplete()
  xhr.send(JSON.stringify(data))
})

export const saveEvent = (data) => request('POST', 'events/save', {}, data)
