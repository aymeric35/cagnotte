import { describe, expect, it } from 'vitest'
import { minifyIdentity } from '../src/minifyIdentity'

describe('minifyIdentity', () => {
  it('returns the correct value for a simple identity', () => {
    const input = 'john.doe@example.com'
    const output = 'JD'
    expect(minifyIdentity(input)).toEqual(output)
  })

  it('returns the correct value when there are multiple spaces', () => {
    const input = '  john    doe  @  example.com'
    const output = 'JD'
    expect(minifyIdentity(input)).toEqual(output)
  })

  it('returns the correct value when there are multiple dots', () => {
    const input = 'jane.doe.smith@example.com'
    const output = 'JD'
    expect(minifyIdentity(input)).toEqual(output)
  })

  it('returns an empty string when given an empty string', () => {
    const input = ''
    const output = ''
    expect(minifyIdentity(input)).toEqual(output)
  })

  it('returns an empty string when given only spaces', () => {
    const input = '   '
    const output = ''
    expect(minifyIdentity(input)).toEqual(output)
  })

  it('returns the correct value for a simple full name', () => {
    const input = 'John Doe'
    const output = 'JD'
    expect(minifyIdentity(input)).toEqual(output)
  })

  it('returns the correct value when there are multiple spaces', () => {
    const input = '  John   Doe  '
    const output = 'JD'
    expect(minifyIdentity(input)).toEqual(output)
  })

  it('returns the correct value when there are multiple names', () => {
    const input = 'Jane Ann Doe'
    const output = 'JA'
    expect(minifyIdentity(input)).toEqual(output)
  })

  it('returns the correct value when the name has a hyphen', () => {
    const input = 'Jean-Paul Sartre'
    const output = 'JS'
    expect(minifyIdentity(input)).toEqual(output)
  })
})
