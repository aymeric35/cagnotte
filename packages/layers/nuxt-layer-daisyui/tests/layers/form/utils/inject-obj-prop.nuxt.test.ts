/* eslint-disable no-prototype-builtins */
import { describe, expect, it } from 'vitest'
import { injectMultipleProps, injectProp } from '~/../nuxt-layer-daisyui-form/utils/inject-obj-prop'

describe('injectProp', () => {
  it('should define a new property on the target object', () => {
    const target: Record<string, any> = {}
    injectProp(target, 'foo')
    expect(target.hasOwnProperty('foo')).toBe(true)
  })

  it('should define a new property with a getter and a setter', () => {
    const target: Record<string, any> = {}
    const get = () => 'foo'
    const set = (value: string) => { }
    injectProp(target, 'foo', get, set)
    expect(target.foo).toBe('foo')
    target.foo = 'bar'
    expect(target.foo).toBe('foo')
  })
})

describe('injectMultipleProps', () => {
  it('should define multiple properties on the target object', () => {
    const target: Record<string, any> = {}
    const props: Record<string, () => any> = {
      foo: () => 'foo',
      bar: () => 'bar',
    }
    injectMultipleProps(target, props)
    expect(target.hasOwnProperty('foo')).toBe(true)
    expect(target.hasOwnProperty('bar')).toBe(true)
  })

  it('should define properties with the correct values', () => {
    const target: Record<string, any> = {}
    const props: Record<string, () => any> = {
      foo: () => 'foo',
      bar: () => 'bar',
    }
    injectMultipleProps(target, props)
    expect(target.foo).toBe('foo')
    expect(target.bar).toBe('bar')
  })
})
