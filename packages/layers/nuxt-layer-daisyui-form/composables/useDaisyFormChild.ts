import { getCurrentInstance, inject, onBeforeUnmount, onMounted, watch } from 'vue'
import type { UseValidate, UseValidateProps } from '~~/types'

const formKey = '_daisy_form_'

type ValidateFn = (val: any) => boolean | Promise<Boolean>
type ResetValidationFn = () => void

interface UseDaisyFormChildParams {
  validate: ValidateFn
  resetValidation: ResetValidationFn
  requiresQForm?: boolean
}

export type DaisyFormInputElement = ComponentPublicInstance & UseValidateProps & UseValidate

export default function ({ validate, resetValidation, requiresQForm }: UseDaisyFormChildParams) {
  // bad, don't use any
  const $form = inject<any>(formKey, false)

  if ($form !== false) {
    const currentInstance = getCurrentInstance()
    if (!currentInstance)
      throw new Error('getCurrentInstance() return null')
    const { props, proxy } = currentInstance as { props: Record<string, unknown>; proxy: ComponentPublicInstance }
    // export public method (so it can be used in QForm)
    Object.assign(proxy, { validate, resetValidation })

    watch(() => props.disabled, (val) => {
      if (val === true) {
        typeof resetValidation === 'function' && resetValidation()
        $form.unbindComponent(proxy as DaisyFormInputElement)
      }
      else {
        $form.bindComponent(proxy as DaisyFormInputElement)
      }
    })

    onMounted(() => {
      // register to parent QForm
      props.disabled !== true && $form.bindComponent(proxy as DaisyFormInputElement)
    })

    onBeforeUnmount(() => {
      // un-register from parent QForm
      props.disabled !== true && $form.unbindComponent(proxy as DaisyFormInputElement)
    })
  }
  else if (requiresQForm === true) {
    console.error('Parent QForm not found on useFormChild()!')
  }
}
