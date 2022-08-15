const db = require('/agenda/commons/db')
const tasksIndex = db.in('tasks')
const loginsIndex = db.in('logins')

module.exports = ({ headers: { login } }, res) => {
  loginsIndex.selectById(login)

  return res.json({ list: [] }) // TODO
}

