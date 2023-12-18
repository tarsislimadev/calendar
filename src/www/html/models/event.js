import { Model } from './model.js'

export class EventModel extends Model {
  id = null
  how = ''
  what = ''
  when_ends = ''
  when_starts = ''
  where = ''
  who = ''

  constructor({ id = null, how = '', what = '', when_ends = '', when_starts = '', where = '', who = '' } = {}) {
    super()

    this.id = id
    this.how = how
    this.what = what
    this.when_ends = when_ends
    this.when_starts = when_starts
    this.where = where
    this.who = who
  }
}
