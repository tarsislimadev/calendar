const tasksIndex = require('/agenda/commons/db').in('tasks')

module.exports = ({ body: { name } }, res) => {
  const created_at = Date.now().toString()

  const task = tasksIndex.new()
  task.writeMany({ name, created_at, user_id })

  return res.json({ id: task.getId(), created_at })
}
