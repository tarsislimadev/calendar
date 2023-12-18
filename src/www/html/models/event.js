import { Model } from './model.js'

export class EventModel extends Model {
  how = ''
  what = ''
  when_ends = ''
  when_starts = ''
  where = ''
  who = ''

  constructor({ how = '', what = '', when_ends = '', when_starts = '', where = '', who = '' } = {}) {
    super()

    this.how = how
    this.what = what
    this.when_ends = when_ends
    this.when_starts = when_starts
    this.where = where
    this.who = who
  }
}
