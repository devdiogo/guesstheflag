import { vi } from 'vitest'
import { wait } from './wait'
import FakeTimers from '@sinonjs/fake-timers'

const clock = FakeTimers.install()

const waitAndExecute = async (ms: number, fn: () => void) => {
  await wait(ms)
  fn()
}

describe('wait', () => {
  it('should wait the given number of milliseconds', async () => {
    const fnSpy = vi.fn()
    const ms = 2000
    waitAndExecute(ms, fnSpy)
    await clock.tickAsync(ms)
    expect(fnSpy).toHaveBeenCalled()
  })
})
