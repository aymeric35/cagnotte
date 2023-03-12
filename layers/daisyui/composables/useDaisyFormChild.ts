import { inject, watch, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'
const formKey = "_daisy_form_";


type ValidateFn = (val: any) => boolean | Promise<Boolean>
type ResetValidationFn = () => void

interface UseDaisyFormChildParams {
    validate: ValidateFn,
    resetValidation: ResetValidationFn,
    requiresQForm?: boolean
}


export default function ({ validate, resetValidation, requiresQForm }: UseDaisyFormChildParams) {
    const $form = inject(formKey, false)

    if ($form !== false) {
        const { props, proxy } = getCurrentInstance()
        // export public method (so it can be used in QForm)
        Object.assign(proxy, { validate, resetValidation })


        watch(() => props.disabled, (val: boolean) => {
            if (val === true) {
                typeof resetValidation === 'function' && resetValidation()
                $form.unbindComponent(proxy)
            }
            else {
                $form.bindComponent(proxy)
            }
        })

        onMounted(() => {
            // register to parent QForm
            props.disabled !== true && $form.bindComponent(proxy)
        })

        onBeforeUnmount(() => {
            // un-register from parent QForm
            props.disabled !== true && $form.unbindComponent(proxy)
        })
    }
    else if (requiresQForm === true) {
        console.error('Parent QForm not found on useFormChild()!')
    }
}
