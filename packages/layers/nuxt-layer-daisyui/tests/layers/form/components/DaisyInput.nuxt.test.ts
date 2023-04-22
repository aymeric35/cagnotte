import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import DaisyInput from '~/../nuxt-layer-daisyui-form/components/daisy/Input.vue'

describe('DaisyInput', () => {
  it('renders the input element', () => {
    const wrapper = mount(DaisyInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders the prepend slot', () => {
    const wrapper = mount(DaisyInput, {
      slots: {
        prepend: '<div class="test-slot"></div>',
      },
    })
    expect(wrapper.find('.input-prepend_wrapper .test-slot').exists()).toBe(true)
  })

  it('renders the append slot', () => {
    const wrapper = mount(DaisyInput, {
      slots: {
        append: '<div class="test-slot"></div>',
      },
    })
    expect(wrapper.find('.input-append_wrapper .test-slot').exists()).toBe(true)
  })

  it('disables the input element when form is disabled', async () => {
    const wrapper = mount(DaisyInput)

    expect(wrapper.find('input').attributes('disabled')).toBe(undefined)
    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('input').attributes('disabled')).toBe('')
  })

  // it('renders the error icon when hasError is true', () => {
  //   const wrapper = mount(DaisyInput, {
  //     props: {
  //       hasError: true,
  //     },
  //   })
  //   expect(wrapper.find('.input-error .icon-error').exists()).toBe(true)
  // })

  // it('does not render the error icon when noErrorIcon is true', () => {
  //   const wrapper = mount(DaisyInput, {
  //     props: {
  //       hasError: true,
  //       noErrorIcon: true,
  //     },
  //   })
  //   expect(wrapper.find('.input-error .icon-error').exists()).toBe(false)
  // })

  it('emits the update:modelValue event when input value changes', async () => {
    const wrapper = mount(DaisyInput)
    const input = wrapper.find('input')
    await input.setValue('test value')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value'])
  })

  // it('calls the resetValidation method when the input is reset', async () => {
  //   const wrapper = mount(DaisyInput)
  //   const resetValidation = vi.spyOn(wrapper.vm, 'resetValidation')
  //   const input = wrapper.find('input')
  //   await input.setValue('test value')
  //   await input.setValue('')
  //   expect(resetValidation).toHaveBeenCalled()
  // })
})
