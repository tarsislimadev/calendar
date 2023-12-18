// 

const name = (n) => n.join('.')

export const set = (path, data = {}) => new Promise((s) => s(localStorage.setItem(name(path), JSON.stringify(data))))

export const add = (path, data = {}) => get(path, [])
  .then((list) => [list.push(data), list][1])
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

export const replace = (path, data = {}, id = null) => get(path, [])
  .then((list) => [list[id] = data, list][1])
  .then((list) => set(path, list))
  .then((list) => list)

export const replaceOrAdd = (path, data = {}) => (!(data?.id == null))
  ? replace(path, data, data?.id)
  : add(path, data)
