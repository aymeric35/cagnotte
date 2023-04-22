<script setup lang="ts">
import { useValidateProps } from '../../composables/useDaisyValidate'

const props = defineProps({
  ...useValidateProps,
  type: {
    type: String,
    validator: (value: InputType) => ['text', 'password'].includes(value),
    default: () => 'text',
  },
  loading: Boolean,
  autofocus: {
    type: Boolean,
    default: () => true,
  },
})

const emit = defineEmits<Emits>()

const slots = useSlots()

interface Emits {
  (eventName: 'update:modelValue', modelValue: string): void
}
type InputType = 'text' | 'password'

const {
  isDirtyModel,
  hasRules,
  innerLoading,
  focused,
  hasError,
  errorMessage,
  formIsDisabled,
  handleFormDisableState,
  resetValidation,
  validate,
} = useDaisyValidate()

const inputData = computed<string>({
  set(val) {
    emit('update:modelValue', val)
  },
  get() {
    return props.modelValue as string
  },
})

const hasAppendSlot = computed<boolean>(() => !!slots.append)
const hasPrependSlot = computed<boolean>(() => !!slots.prepend)

const inputClass = computed<string[]>(() => {
  const classes = ['input', 'w-full']
  if (hasError.value)
    classes.push('input-error')
  if (hasAppendSlot.value)
    classes.push('pr-14')
  if (hasPrependSlot.value)
    classes.push('pl-14')
  return classes
})

defineExpose({
  handleFormDisableState,
  validate,
  resetValidation,
})
</script>

<template>
  <div class="w-full">
    <div class="flex items-center relative">
      <div v-if="hasPrependSlot" class="input-prepend_wrapper absolute ml-4">
        <slot name="prepend" />
      </div>

      <input v-model="inputData" :type="type" :disabled="formIsDisabled || disabled" :autofocus="autofocus"
        placeholder="Type here" :class="inputClass" v-bind="$attrs" @focusin="focused = true" @focusout="focused = false">
      <div v-if="hasAppendSlot || loading || innerLoading" class="input-append_wrapper absolute mr-4">
        <div v-if="loading || innerLoading" class="mr-3">
          <DaisySpinner width="2" :size="9" />
        </div>
        <slot v-else name="append" />
      </div>
    </div>

    <label class="label pb-0">
      <span class="label-text-alt text-error">
        {{ errorMessage || ' ' }}&nbsp;
      </span>
    </label>
  </div>
</template>

<style scoped>
.input-append_wrapper {
  right: 0;
}

.input-prepend_wrapper {
  left: 0;
}
</style>
