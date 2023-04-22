import { describe, expect, it } from 'vitest'
import debounce from '~/../nuxt-layer-daisyui-form/utils/debounce'

describe('debounce', () => {
  it('should return a function', () => {
    const debounced = debounce(() => null)
    expect(typeof debounced).toBe('function')
  })

  it('should execute the debounced function after a specified wait period', () => {
    let result: string | undefined
    const fn = () => result = 'hello'
    const debounced = debounce(fn, 500)
    debounced()
    expect(result).toBe(undefined)
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(result).toBe('hello')
        resolve()
      }, 600)
    })
  })

  it('should execute the function immediately if immediate is true', () => {
    const fn = () => 'hello'
    const debounced = debounce(fn, 500, true)
    const result = debounced()
    expect(result).toBe('hello')
  })

  it('should cancel the timer for the debounced function', () => {
    let result: string | undefined
    const fn = () => result = 'hello'
    const debounced = debounce(fn, 500)
    debounced()
    debounced.cancel()
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(result).toBe(undefined)
        resolve()
      }, 600)
    })
  })
})
