import InfoComponent from '../../components/daisy/toast/info.vue'
import SuccessComponent from '../../components/daisy/toast/success.vue'
import ErrorComponent from '../../components/daisy/toast/error.vue'
import WarningComponent from '../../components/daisy/toast/warning.vue'
import DefaultComponent from '../../components/daisy/toast/default.vue'
import eventBus from './bus.js'
import { createComponent } from './helpers'
import ToastWrapperComponent from './Wrapper.vue'
import type { ToastPluginApi, ToastType } from '~~/types/toast'

export function useToast(globalProps = {}): ToastPluginApi {
  return {

    custom(element, options = {}) {
      const wrapperPropsData = Object.assign({}, globalProps, options)
      delete wrapperPropsData.props

      const toast = {
        dismiss: () => {
          // eslint-disable-next-line no-console
          console.log('Toast "dismiss" not injected')
        },
      }

      const childPropsData = Object.assign({}, options?.props || {}, { toast })
      const vNode = h(element, childPropsData)

      const instance = createComponent(ToastWrapperComponent, wrapperPropsData, document.body, { default: () => vNode })

      // @ts-expect-error find a way to check type
      const dismiss = instance?.ctx.dismiss

      toast.dismiss = dismiss

      return {
        dismiss,
      }
    },
    open(options) {
      let message = null
      if (typeof options === 'string') {
        message = options
        return this.default(message)
      }
      message = options.message ?? ''
      let type: ToastType = (options.type ?? 'default') as ToastType
      if (options.message) {
        delete options.message
      }

      if (!['success', 'error', 'info', 'warning', 'default'].includes(type)) {
        type = 'default'
      }

      return this[type](message, options)
    },
    clear() {
      eventBus.emit('toast-clear')
    },
    success(message: string, options = {}) {
      return this.custom(SuccessComponent, { ...options, props: { message } })
    },
    error(message: string, options = {}) {
      return this.custom(ErrorComponent, { ...options, props: { message } })
    },
    info(message: string, options = {}) {
      return this.custom(InfoComponent, { ...options, props: { message } })
    },
    warning(message: string, options = {}) {
      return this.custom(WarningComponent, { ...options, props: { message } })
    },
    default(message: string, options = {}) {
      return this.custom(DefaultComponent, { ...options, props: { message } })
    },
  }
}
