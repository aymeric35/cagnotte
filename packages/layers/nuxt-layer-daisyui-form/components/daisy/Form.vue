<script setup lang="ts">
import type { VNodeRef } from 'vue'
import type { DaisyFormInputElement } from '~~/composables/useDaisyFormChild'

interface Props {
  modelValue?: boolean | undefined
  autofocus?: boolean
  noErrorFocus?: boolean
  noResetFocus?: boolean
  greedy?: boolean
  disabled?: boolean
  onSubmit?: (evt: Event | SubmitEvent) => void
}

interface Emits {
  (eventName: 'update:modelValue', modelValue: boolean): void
  (eventName: 'submit', evt: Event | SubmitEvent): void
  (eventName: 'reset'): void
  (eventName: 'validationSuccess'): void
  (eventName: 'validationError', ref: Element): void
}

const props = withDefaults(defineProps<Props>(), {
  autofocus: true,
  modelValue: undefined,
})
const emit = defineEmits<Emits>()
// ---------------------------------------------------------------- //
const valid = computed({
  set(val: boolean) {
    emit('update:modelValue', val)
  },
  get() {
    return props.modelValue
  },
})

const rootRef = ref<VNodeRef | null>(null)
// const registeredComponents = []
// type RegisterComponent = Element & {
//     handleFormDisableState: (disabled: boolean) => void
//     validate: (val: any) => boolean | Promise<boolean>
//     resetValidation: () => void
// }

const registeredComponents = reactive<DaisyFormInputElement[]>([])
// const registeredComponents = reactive<RegisterComponent[]>([])
let validateIndex = 0
// ---------------------------------------------------------------- //

provide('_daisy_form_', {
  bindComponent(vmProxy: DaisyFormInputElement) {
    registeredComponents.push(vmProxy)
  },

  unbindComponent(vmProxy: DaisyFormInputElement) {
    const index = registeredComponents.indexOf(vmProxy)
    if (index > -1) {
      registeredComponents.splice(index, 1)
    }
  },
})

function handleDisabledState() {
  registeredComponents.forEach(comp => comp.handleFormDisableState(props.disabled))
  if (props.disabled) {
    rootRef.value.setAttribute('disabled', props.disabled)
  }
  else {
    rootRef.value.removeAttribute('disabled')
  }
}

watch(() => props.disabled, () => {
  handleDisabledState()
})
// ---------------------------------------------------------------- //

function validate(shouldFocus?: boolean): Promise<boolean> {
  const focus = typeof shouldFocus === 'boolean'
    ? shouldFocus
    : props.noErrorFocus !== true

  const index = ++validateIndex

  const emitEvent = (res: boolean, ref?: any) => {
    if (res === true) {
      emit('validationSuccess')
    }
    else {
      emit('validationError', ref)
    }
  }

  const validateComponent = (comp: DaisyFormInputElement) => {
    const valid = comp.validate()
    const isPromise = valid instanceof Promise && typeof valid.then === 'function'
    return isPromise
      ? valid.then(
        (valid: any) => ({ valid, comp }),
        (err: any) => ({ valid: false, comp, err }),
      )
      : Promise.resolve({ valid, comp })
  }

  const vmIsDestroyed = (vm: any) => {
    return vm.isUnmounted === true || vm.isDeactivated === true
  }
  const errorsPromise = props.greedy === true
    ? Promise
      .all(registeredComponents.map(validateComponent))
      .then(res => res.filter(r => r.valid !== true))
    : registeredComponents
      .reduce(
        (acc, comp) => acc.then(() => {
          return validateComponent(comp).then((r) => {
            if (r.valid === false) {
              return Promise.reject(r)
            }
          })
        }),
        Promise.resolve(),
      )
      .catch((error: any) => [error])

  return errorsPromise.then((errors: any) => {
    // eslint-disable-next-line no-void
    if (errors === void 0 || errors.length === 0) {
      index === validateIndex && emitEvent(true)
      return true
    }

    // if not outdated already
    if (index === validateIndex) {
      const { comp, err } = errors[0]

      // eslint-disable-next-line no-void
      err !== void 0 && console.error(err)
      emitEvent(false, comp)

      if (focus === true) {
        // Try to focus first mounted and active component
        const getAutoFocusEl = (comp: DaisyFormInputElement) => comp.$el.querySelector('[autofocus]') ?? {}

        const activeError = errors.find(({ comp }: any) => (
          typeof getAutoFocusEl(comp).focus === 'function'
          && vmIsDestroyed(comp.$) === false
        ))
        // eslint-disable-next-line no-void
        if (activeError !== void 0) {
          getAutoFocusEl(activeError.comp).focus()
        }
      }
    }

    return false
  })
}
function focus(): void {
  if (rootRef.value === null) {
    return
  }

  const target = rootRef.value.querySelector('[autofocus]')

  // eslint-disable-next-line no-void
  target !== null && target !== void 0 && target.focus({ preventScroll: true })
}
function resetValidation(): void {
  validateIndex++

  registeredComponents.forEach((comp) => {
    typeof comp.resetValidation === 'function' && comp.resetValidation()
  })
}
function stopAndPrevent(evt: Event): void {
  evt.cancelable !== false && evt.preventDefault()
  evt.stopPropagation()
}
function submit(evt: Event | SubmitEvent): void {
  // eslint-disable-next-line no-void
  evt !== void 0 && stopAndPrevent(evt)

  const index = validateIndex + 1

  validate().then((val) => {
    // if not outdated && validation succeeded
    if (index === validateIndex && val === true) {
      // eslint-disable-next-line no-void
      if (props.onSubmit !== void 0) {
        emit('submit', evt)
      }
      // @ts-expect-error todo
      // eslint-disable-next-line no-void
      else if (evt !== void 0 && evt.target !== void 0 && typeof evt?.target?.submit === 'function') {
        // @ts-expect-error todo
        evt.target.submit()
      }
    }
  })
}

function reset(evt: Event): void {
  // eslint-disable-next-line no-void
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

watchEffect(() => {
  if (typeof props.modelValue === 'boolean') {
    watch(() => registeredComponents.map(comp => comp.modelValue), (val, old) => {
      validate(false).then((success) => {
        valid.value = success
      })
    })
  }
})

// ---------------------------------------------------------------- //

let shouldActivate = false

onDeactivated(() => {
  shouldActivate = true
})

onActivated(() => {
  if (shouldActivate) {
    handleDisabledState()
    props.autofocus === true && focus()
  }
})

onMounted(() => {
  props.autofocus === true && focus()
  handleDisabledState()
})

defineExpose({
  validate,
  resetValidation,
  submit,
  reset,
  focus,
  getValidationComponents: () => registeredComponents,
})
</script>

<template>
  <form :ref="(el: VNodeRef) => rootRef = el" class="form-control" v-bind="$attrs"
    @submit.prevent="evt => emit('submit', evt)">
    <slot />
  </form>
</template>
