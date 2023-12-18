// 

const name = (n) => n.join('.')

export const set = (path, data = {}) => new Promise((s) => {
  localStorage.setItem(name(path), JSON.stringify(data))
  s({})
})

export const add = (path, data = {}) => get(path, [])
  .then((list) => [list.push(data), list, console.log({ list })][1])
  .then((list) => set(path, list))
  .then((list) => list)

export const get = (path, def = null) => new Promise((s, f) => {
  try {
    const item = localStorage.getItem(name(path))

    if (item) {
      s(JSON.parse(item))
    } else {
      s(def)
    }

  } catch (e) {
    console.error(e)
    f(new Error('Item not found.'))
  }
})
