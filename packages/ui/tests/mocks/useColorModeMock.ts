import type { ColorModeInstance } from '@nuxtjs/color-mode/dist/runtime/types'
import { vi } from 'vitest'

const defaultValue: ColorModeInstance = {
  preference: 'light',
  value: 'light',
  unknown: false,
  forced: true,
}

const useColorModeMock = vi.fn(() => {
  return defaultValue
})
export default useColorModeMock
