/* eslint-disable no-void */
import { testPattern } from '../utils/patterns'
import debounce from '../utils/debounce'
import { injectProp } from '../utils/inject-obj-prop'
import type { LazyRule, UseValidate, UseValidateProps } from '~~/types'

const lazyRulesValues = [true, false, 'ondemand']

export const useValidateProps = {
  modelValue: {},

  error: {
    type: Boolean,
    default: null,
  },
  errorMessage: String,
  noErrorIcon: Boolean,

  rules: Array,
  disabled: Boolean,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    validator: (value: LazyRule) => lazyRulesValues.includes(value),
  },
}

export default function (): UseValidate {
  const currentInstance = getCurrentInstance()
  if (!currentInstance)
    throw new Error('getCurrentInstance() return null')
  const { proxy } = currentInstance
  const props: UseValidateProps = currentInstance.props

  const innerError = ref<boolean>(false)
  const innerErrorMessage = ref<string | boolean | null>(null)
  const isDirtyModel = ref<boolean | null>(null)
  const formIsDisabled = ref<boolean>(false)
  const innerLoading = ref<boolean>(false)
  const focused = ref<boolean>(false)

  useDaisyFormChild({ validate, resetValidation })

  let validateIndex = 0
  let unwatchRules: ReturnType<typeof watch> | undefined

  const debouncedValidate = debounce(validate, 0)

  const hasRules = computed<boolean>(() =>
    props.rules !== void 0
    && props.rules !== null
    && props.rules.length > 0,
  )

  const hasActiveRules = computed<boolean>(() =>
    props.disabled !== true
    && hasRules.value === true,
  )

  const hasError = computed<boolean>(() =>
    props.error === true || innerError.value === true,
  )

  const errorMessage = computed<string | boolean | null>(() => (
    (typeof props.errorMessage === 'string' && props.errorMessage.length > 0)
      ? props.errorMessage
      : innerErrorMessage.value
  ))

  watch(() => props.modelValue, () => {
    validateIfNeeded()
  })

  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, () => {
          validateIfNeeded(true)
        })
      }
    }
    else if (unwatchRules !== void 0) {
      unwatchRules()
      unwatchRules = void 0
    }
  }, { immediate: true })

  watch(focused, (val) => {
    if (val === true) {
      if (isDirtyModel.value === null) {
        isDirtyModel.value = false
      }
    }
    else if (isDirtyModel.value === false) {
      isDirtyModel.value = true

      if (
        hasActiveRules.value === true
        && props.lazyRules !== 'ondemand'
        // Don't re-trigger if it's already in progress;
        // It might mean that focus switched to submit btn and
        // QForm's submit() has been called already (ENTER key)
        && innerLoading.value === false
      ) {
        debouncedValidate()
      }
    }
  })

  function resetValidation() {
    validateIndex++
    innerLoading.value = false
    isDirtyModel.value = null
    innerError.value = false
    innerErrorMessage.value = null
    debouncedValidate.cancel()
  }

  /*
     * Return value
     *   - true (validation succeeded)
     *   - false (validation failed)
     *   - Promise (pending async validation)
     */
  function validate(val: any = props.modelValue): boolean | Promise<boolean> {
    if (hasActiveRules.value !== true) {
      return true
    }

    const index = ++validateIndex

    const setDirty = innerLoading.value !== true
      ? () => { isDirtyModel.value = true }
      : () => { }

    const update = (err: boolean, msg?: string | boolean) => {
      err === true && setDirty()

      innerError.value = err
      innerErrorMessage.value = msg || null
      innerLoading.value = false
    }

    const promises = []
    const rules = props.rules!

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      let res

      if (typeof rule === 'function') {
        res = rule(val, testPattern)
      }
      else if (typeof rule === 'string' && testPattern[rule] !== void 0) {
        res = testPattern[rule](val)
      }

      if (res === false || typeof res === 'string') {
        update(true, res)
        return false
      }
      else if (res !== true && res !== void 0) {
        promises.push(res)
      }
    }

    if (promises.length === 0) {
      update(false)
      return true
    }

    innerLoading.value = true

    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false)
          return true
        }

        const msg = res.find(r => r === false || typeof r === 'string')
        index === validateIndex && update(msg !== void 0, msg)
        return msg === void 0
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e)
          update(true)
        }

        return false
      },
    )
  }

  function validateIfNeeded(changedRules?: boolean) {
    if (
      hasActiveRules.value === true
      && props.lazyRules !== 'ondemand'
      && (isDirtyModel.value === true || (props.lazyRules !== true && changedRules !== true))
    ) {
      debouncedValidate()
    }
  }

  function handleFormDisableState(disabled: boolean) {
    formIsDisabled.value = disabled
  }

  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules()
    debouncedValidate.cancel()
  })

  // expose public methods & props
  // @ts-expect-error blablabla
  Object.assign(proxy, { resetValidation, validate, handleFormDisableState })
  injectProp<boolean>(proxy, 'hasError', () => hasError.value)

  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    formIsDisabled,
    innerLoading,
    focused,

    handleFormDisableState,
    validate,
    resetValidation,
  }
}
