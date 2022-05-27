import { formatTime } from './format-time'

describe('Util: format-test', () => {
  it('should format time', () => {
    expect(formatTime(0)).toBe('00:00')
    expect(formatTime(5)).toBe('00:05')
    expect(formatTime(60)).toBe('01:00')
    expect(formatTime(61)).toBe('01:01')
    expect(formatTime(60 * 15)).toBe('15:00')
  })
})
