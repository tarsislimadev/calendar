// 

export const set = (path, data = {}) => new Promise((s) => {
  localStorage.setItem(path.join('.'), JSON.stringify(data))
  s({})
})

// export const add = (path, data = {}) => new Promise((s) => { })

export const get = (path, def = null) => new Promise((s, f) => {
  const item = localStorage.getItem(path.join('.'))

  try {
    !!item ? s(JSON.parse(item)) : s(def)
  } catch (e) {
    console.error(e)
    f(new Error('Item not found.'))
  }
})
