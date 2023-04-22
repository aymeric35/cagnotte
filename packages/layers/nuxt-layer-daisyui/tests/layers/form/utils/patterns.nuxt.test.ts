import { describe, expect, it } from 'vitest'
import type { TestPattern } from '~/../nuxt-layer-daisyui-form/utils/patterns'
import { testPattern } from '~/../nuxt-layer-daisyui-form/utils/patterns'

describe('patterns', () => {
  describe('testPattern', () => {
    it('should match date pattern', () => {
      const datePattern: TestPattern['date'] = testPattern.date
      expect(datePattern('31/01/2023')).toBe(true)
      expect(datePattern('31-01-2023')).toBe(true)
      expect(datePattern('31.01.2023')).toBe(true)
      expect(datePattern('29/02/2024')).toBe(true)
      expect(datePattern('29-02-2000')).toBe(true)
      expect(datePattern('28/02/2023')).toBe(true)
      expect(datePattern('28.02.2023')).toBe(true)
      expect(datePattern('31/04/2023')).toBe(false)
      expect(datePattern('32-01-2023')).toBe(false)
      expect(datePattern('29-02-1900')).toBe(false)
      expect(datePattern('29/02/2023')).toBe(false)
      expect(datePattern('2023/01/31')).toBe(false)
    })

    it('should match time pattern', () => {
      const timePattern: TestPattern['time'] = testPattern.time
      expect(timePattern('23:59')).toBe(true)
      expect(timePattern('01:61')).toBe(false)
    })

    it('should match fulltime pattern', () => {
      const fulltimePattern: TestPattern['fulltime'] = testPattern.fulltime
      expect(fulltimePattern('23:59:59')).toBe(true)
      expect(fulltimePattern('01:61:20')).toBe(false)
    })

    it('should match timeOrFulltime pattern', () => {
      const timeOrFulltimePattern: TestPattern['timeOrFulltime'] = testPattern.timeOrFulltime
      expect(timeOrFulltimePattern('23:59')).toBe(true)
      expect(timeOrFulltimePattern('01:61:20')).toBe(false)
    })

    it('should match email pattern', () => {
      const emailPattern: TestPattern['email'] = testPattern.email
      expect(emailPattern('test@example.com')).toBe(true)
      expect(emailPattern('not an email')).toBe(false)
    })

    it('should match hexColor pattern', () => {
      const hexColorPattern: TestPattern['hexColor'] = testPattern.hexColor
      expect(hexColorPattern('#000')).toBe(true)
      expect(hexColorPattern('#123456')).toBe(true)
      expect(hexColorPattern('123456')).toBe(false)
      expect(hexColorPattern('#GHIJKL')).toBe(false)
    })

    it('should match hexaColor pattern', () => {
      const hexaColorPattern: TestPattern['hexaColor'] = testPattern.hexaColor
      expect(hexaColorPattern('#0000')).toBe(true)
      expect(hexaColorPattern('#1234abcd')).toBe(true)
      expect(hexaColorPattern('1234abcd')).toBe(false)
      expect(hexaColorPattern('#GHIJ')).toBe(false)
    })

    it('should match hexOrHexaColor pattern', () => {
      const hexOrHexaColorPattern: TestPattern['hexOrHexaColor'] = testPattern.hexOrHexaColor
      expect(hexOrHexaColorPattern('#000')).toBe(true)
      expect(hexOrHexaColorPattern('#123456')).toBe(true)
      expect(hexOrHexaColorPattern('#0000')).toBe(true)
      expect(hexOrHexaColorPattern('#1234abcd')).toBe(true)
      expect(hexOrHexaColorPattern('123456')).toBe(false)
      expect(hexOrHexaColorPattern('#GHIJ')).toBe(false)
    })

    it('should match rgbColor pattern', () => {
      const rgbColorPattern: TestPattern['rgbColor'] = testPattern.rgbColor
      expect(rgbColorPattern('rgb(0,0,0)')).toBe(true)
      expect(rgbColorPattern('rgb(255,255,255)')).toBe(true)
      expect(rgbColorPattern('rgb(256,0,0)')).toBe(false)
    })

    it('should match rgbaColor pattern', () => {
      const rgbaColorPattern: TestPattern['rgbaColor'] = testPattern.rgbaColor
      expect(rgbaColorPattern('rgba(0,0,0,1)')).toBe(true)
      expect(rgbaColorPattern('rgba(255,255,255,0.5)')).toBe(true)
      expect(rgbaColorPattern('rgba(255,255,256,1)')).toBe(false)
      expect(rgbaColorPattern('rgba(0,0,0,2)')).toBe(false)
      expect(rgbaColorPattern('rgb(0,0,0)')).toBe(false)
      expect(rgbaColorPattern('#000')).toBe(false)
    })

    it('should match rgbOrRgbaColor pattern', () => {
      const rgbOrRgbaColorPattern: TestPattern['rgbOrRgbaColor'] = testPattern.rgbOrRgbaColor
      expect(rgbOrRgbaColorPattern('rgb(255,0,0)')).toBe(true)
      expect(rgbOrRgbaColorPattern('rgba(255,0,0,0.5)')).toBe(true)
      expect(rgbOrRgbaColorPattern('rgba(355,0,0,0.5)')).toBe(false)
      expect(rgbOrRgbaColorPattern('#FF0000')).toBe(false)
      expect(rgbOrRgbaColorPattern('#FF0000FF')).toBe(false)
      expect(rgbOrRgbaColorPattern('red')).toBe(false)
      expect(rgbOrRgbaColorPattern('invalid')).toBe(false)
    })

    it('should match hexOrRgbColor pattern', () => {
      const hexOrRgbColorPattern: TestPattern['hexOrRgbColor'] = testPattern.hexOrRgbColor
      expect(hexOrRgbColorPattern('#000')).toBe(true)
      expect(hexOrRgbColorPattern('#123456')).toBe(true)
      expect(hexOrRgbColorPattern('#1234567')).toBe(false)
      expect(hexOrRgbColorPattern('rgb(255,0,0)')).toBe(true)
      expect(hexOrRgbColorPattern('#000000')).toBe(true)
      expect(hexOrRgbColorPattern('123456')).toBe(false)
      expect(hexOrRgbColorPattern('#GHIJ')).toBe(false)
    })

    it('should match hexaOrRgbaColor pattern', () => {
      const hexaOrRgbaColorPattern: TestPattern['hexaOrRgbaColor'] = testPattern.hexaOrRgbaColor
      expect(hexaOrRgbaColorPattern('#1234abcd')).toBe(true)
      expect(hexaOrRgbaColorPattern('rgba(255,0,0,0.5)')).toBe(true)
      expect(hexaOrRgbaColorPattern('#0000')).toBe(true)
      expect(hexaOrRgbaColorPattern('#FF0000FF')).toBe(true)
      expect(hexaOrRgbaColorPattern('1234abcd')).toBe(false)
      expect(hexaOrRgbaColorPattern('#GHIJ')).toBe(false)
    })

    it('should match anyColor pattern', () => {
      const anyColorPattern: TestPattern['anyColor'] = testPattern.anyColor
      expect(anyColorPattern('#000')).toBe(true)
      expect(anyColorPattern('#123456')).toBe(true)
      expect(anyColorPattern('#1234abcd')).toBe(true)
      expect(anyColorPattern('rgb(255,0,0)')).toBe(true)
      expect(anyColorPattern('rgba(255,0,0,0.5)')).toBe(true)
      expect(anyColorPattern('#0000')).toBe(true)
      expect(anyColorPattern('#FF0000')).toBe(true)
      expect(anyColorPattern('#FF0000FF')).toBe(true)
      expect(anyColorPattern('123456')).toBe(false)
      expect(anyColorPattern('#GHIJ')).toBe(false)
    })
  })
})
