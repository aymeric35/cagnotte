import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '~/components/daisy/Button.vue'

describe('Button', () => {
  it('renders the button element', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
