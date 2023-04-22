import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import SwitchColorMode from '~/components/daisy/SwitchColorMode.vue'

// mockNuxtImport('useColorMode', () => {
//   return () => useColorModeMock()
// })

describe('SwitchColorMode', () => {
  it('renders the SwitchColorMode element', async () => {
    const wrapper = await buildWrapper('light')

    expect(wrapper.find('.switch-color-mode').exists()).toBe(true)
  })

  it('should has input value to true if vmodel is light', async () => {
    const wrapper = await buildWrapper('light')

    expect(wrapper.find('input[type=checkbox]').attributes('value')).toBe('true')
    /**
     * <Icon/> is async and nuxt-vitest doesn't populate the component (is this a bug ? idk)
     * So if there is nothing it's normal, not the best way, but if the test failed in the future,
     * that means the behavior has changed and it need to be updated
     */
    expect(wrapper.find('.switch-color-mode > label > svg').exists()).toBe(false)
  })
  it('should has input value to true if vmodel is dark', async () => {
    const wrapper = await buildWrapper('dark')

    expect(wrapper.find('input[type=checkbox]').attributes('value')).toBe('false')
    expect(wrapper.find('.switch-color-mode > label > svg').exists()).toBe(false)
  })
  it('should switch from light and dark', async () => {
    const wrapper = await buildWrapper('light')

    expectInputInteractionToUpdateModel(wrapper, 'dark')
  })

  it('should switch from dark to light', async () => {
    const wrapper = await buildWrapper('dark')

    expectInputInteractionToUpdateModel(wrapper, 'light')
  })
})

async function buildWrapper(colorPreference: string) {
  const wrapper = mount(SwitchColorMode, {
    props: {
      modelValue: colorPreference,
    },
  })

  await flushPromises()
  return wrapper
}

async function expectInputInteractionToUpdateModel(wrapper: any, expectedValue: 'light' | 'dark') {
  const input = wrapper.find('input[type=checkbox]')
  await input.setValue()
  expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(expectedValue)
}
