import * as _ from 'lodash'

export default new class {

  getIds (list: any[], keys: string[]) {
    const key = keys[0] || ''
    const ids = [] as string[]
    if (key) _.forEach(list, v => {
      const item = _.get(v, key) as any
      if (typeof item === 'string')
        ids.push(item)
      else if (_.isArray(item))
        ids.push(...this.getIds(item, keys.slice(1)))
    })
    else _.forEach(list, v => {
      if (typeof v === 'string') ids.push(v)
    })
    return ids
  }

  setValues (list: any, data: any, keys: string[], extend = '', value = {}) {
    const key = keys[0] || ''
    const values = [] as any[]
    if (key) _.forEach(list, v => {
      const item = _.get(v, key) as any
      if (typeof item === 'string') {
        const new_data = data[item] || value
        extend ? _.set(v, extend, new_data) : _.assign(v, new_data)
      } else if (_.isArray(item)) {
        const new_array = this.setValues(item, data, keys.slice(1), extend, value)
        new_array.length && _.set(v, extend, new_array)
      }
    })
    else _.forEach(list, v => {
      if (typeof v === 'string') values.push(data[v] || value)
    })
    return values
  }
}