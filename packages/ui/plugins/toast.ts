import { useToast } from './toast/api'
import type { ToastPluginApi } from '~~/types/toast'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      toast: useToast({ position: 'bottom' }) as ToastPluginApi,
    },
  }
})
