const tasksIndex = require('/agenda/commons/db').in('tasks')

module.exports = ({ body }, res) => {
  const { _id, where, who, start_date, end_date, why } = body
  const updated_at = Date.now().toString()

  const task = tasksIndex.selectById(_id)
  task.writeMany({ where, who, start_date, end_date, why, updated_at })

  return res.json({ id: task.getId(), updated_at })
}
