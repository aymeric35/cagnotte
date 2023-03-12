<template>
    <form class="form-control" :ref="el => rootRef = el" @submit.prevent="evt => emit('submit', evt)" v-bind="$attrs">
        <slot></slot>
    </form>
</template>

<script setup lang="ts">

interface Props {
    modelValue?: boolean | undefined
    autofocus?: boolean
    noErrorFocus?: boolean
    noResetFocus?: boolean
    greedy?: boolean
    disabled?: boolean
    onSubmit?: () => any
}

interface Emits {
    (eventName: "update:modelValue", modelValue: boolean): void,
    (eventName: "submit", evt: Event | SubmitEvent): void,
    (eventName: "reset"): void,
    (eventName: "validationSuccess"): void,
    (eventName: "validationError", ref: Element): void,
}

const emit = defineEmits<Emits>()
const props = withDefaults(defineProps<Props>(), {
    autofocus: true,
    modelValue: undefined
})

// ---------------------------------------------------------------- //
const valid = computed({
    set(val) {
        emit('update:modelValue', val)
    },
    get() {
        return props.modelValue
    }
})

const rootRef = ref(null)
// const registeredComponents = []
const registeredComponents = reactive([])
let validateIndex = 0
// ---------------------------------------------------------------- //

provide("_daisy_form_", {
    bindComponent(vmProxy) {
        registeredComponents.push(vmProxy)
    },

    unbindComponent(vmProxy) {
        const index = registeredComponents.indexOf(vmProxy)
        if (index > -1) {
            registeredComponents.splice(index, 1)
        }
    }
})

const handleDisabledState = () => {
    registeredComponents.forEach(comp => comp.handleFormDisableState(props.disabled))
    if (props.disabled) {
        rootRef.value.setAttribute('disabled', props.disabled)
    } else {
        rootRef.value.removeAttribute('disabled')
    }
}

watch(() => props.disabled, () => {
    handleDisabledState()

})
// ---------------------------------------------------------------- //


watchEffect(() => {
    if (typeof props.modelValue === 'boolean') {
        watch(() => registeredComponents.map(comp => comp.modelValue), (val, old) => {
            validate(false).then(success => {
                valid.value = success
            })
        })
    }
});



const validate = (shouldFocus?: boolean): Promise<boolean> => {
    const focus = typeof shouldFocus === 'boolean'
        ? shouldFocus
        : props.noErrorFocus !== true

    const index = ++validateIndex

    const emitEvent = (res: boolean, ref?: any) => {
        emit('validation' + (res === true ? 'Success' : 'Error'), ref)
    }

    const validateComponent = comp => {
        const valid = comp.validate()

        return typeof valid.then === 'function'
            ? valid.then(
                valid => ({ valid, comp }),
                err => ({ valid: false, comp, err })
            )
            : Promise.resolve({ valid, comp })
    }

    const vmIsDestroyed = (vm) => {
        return vm.isUnmounted === true || vm.isDeactivated === true
    }
    const errorsPromise = props.greedy === true
        ? Promise
            .all(registeredComponents.map(validateComponent))
            .then(res => res.filter(r => r.valid !== true))
        : registeredComponents
            .reduce(
                (acc, comp) => acc.then(() => {
                    return validateComponent(comp).then(r => {
                        if (r.valid === false) { return Promise.reject(r) }
                    })
                }),
                Promise.resolve()
            )
            .catch(error => [error])

    return errorsPromise.then(errors => {
        if (errors === void 0 || errors.length === 0) {
            index === validateIndex && emitEvent(true)
            return true
        }

        // if not outdated already
        if (index === validateIndex) {
            const { comp, err } = errors[0]

            err !== void 0 && console.error(err)
            emitEvent(false, comp)

            if (focus === true) {
                // Try to focus first mounted and active component
                const getAutoFocusEl = (comp) => comp.$el.querySelector('[autofocus]') ?? {}

                const activeError = errors.find(({ comp }) => (
                    typeof getAutoFocusEl(comp).focus === 'function'
                    && vmIsDestroyed(comp.$) === false
                ))
                if (activeError !== void 0) {
                    getAutoFocusEl(activeError.comp).focus()
                }
            }
        }

        return false
    })

}
const focus = (): void => {
    if (rootRef.value === null) { return }

    const target = rootRef.value.querySelector('[autofocus]')

    target !== null && target !== void 0 && target.focus({ preventScroll: true })
}
const resetValidation = (): void => {
    validateIndex++

    registeredComponents.forEach(comp => {
        typeof comp.resetValidation === 'function' && comp.resetValidation()
    })
}
const submit = (evt: Event): void => {
    evt !== void 0 && stopAndPrevent(evt)

    const index = validateIndex + 1

    validate().then(val => {
        // if not outdated && validation succeeded
        if (index === validateIndex && val === true) {
            if (props.onSubmit !== void 0) {
                emit('submit', evt)
            }
            else if (evt !== void 0 && evt.target !== void 0 && typeof evt.target.submit === 'function') {
                evt.target.submit()
            }
        }
    })
}
const stopAndPrevent = (evt: Event): void => {
    evt.cancelable !== false && evt.preventDefault()
    evt.stopPropagation()
}
const reset = (evt: Event): void => {
    evt !== void 0 && stopAndPrevent(evt)

    emit('reset')

    nextTick(() => { // allow userland to reset values before
        resetValidation()
        if (props.autofocus === true && props.noResetFocus !== true) {
            focus()
        }
    })
}


// ---------------------------------------------------------------- //


let shouldActivate = false

onDeactivated(() => {
    shouldActivate = true
})

onActivated(() => {
    if (shouldActivate) {
        handleDisabledState();
        props.autofocus === true && focus();
    }
})

onMounted(() => {
    props.autofocus === true && focus();
    handleDisabledState();

})

defineExpose({
    validate,
    resetValidation,
    submit,
    reset,
    focus,
    getValidationComponents: () => registeredComponents
})
</script>

<style scoped></style>