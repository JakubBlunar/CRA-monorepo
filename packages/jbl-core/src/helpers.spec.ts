import { formatDate } from './helpers'

describe('helpers tests', () => {
  it('tests formatDate function', () => {
    expect(formatDate(new Date(2020, 11, 6, 22, 0))).toEqual('2020/12/06 21:00:00')
  })
})
