<template>
    <div class="w-full">
        <div class="flex items-center relative">
            <div v-if="hasPrependSlot" class="input-prepend_wrapper absolute ml-5 text-xl">
                <slot name="prepend"></slot>
            </div>

            <input v-model="inputData" :type="type" :disabled="formIsDisabled || disabled" :autofocus="autofocus"
                @focusin="focused = true" @focusout="focused = false" placeholder="Type here" :class="inputClass"
                v-bind="$attrs" />
            <div v-if="hasAppendSlot || loading || innerLoading" class="input-append_wrapper absolute mr-5 text-xl">
                <div v-if="loading || innerLoading" class="mr-5">
                    <DaisySpinner width="2" :size="10"></DaisySpinner>
                </div>
                <slot v-else name="append"></slot>
            </div>
        </div>

        <label class="label pb-0">
            <span class="label-text-alt text-error">
                {{ errorMessage || ' ' }}&nbsp;
            </span>
        </label>

    </div>
</template>

<script setup lang="ts">
import { useValidateProps } from "../../composables/useDaisyValidate";

const slots = useSlots();
const emit = defineEmits();

const props = defineProps({
    ...useValidateProps,
    type: {
        type: String,
        validator: (value: lazyRule) => ['text', 'password'].includes(value),
        default: () => 'text'
    },
    loading: Boolean,
    autofocus: {
        type: Boolean,
        default: () => true
    }
})


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

const inputData = computed({
    set(val) {
        emit('update:modelValue', val)
    },
    get() {
        return props.modelValue
    }
})

const inputClass = computed<string[]>(() => {
    const classes = ['input', 'w-full'];
    if (hasError.value) classes.push('input-error');
    if (hasAppendSlot.value) classes.push('pr-14');
    if (hasPrependSlot.value) classes.push('pl-14');
    return classes;
})


const hasAppendSlot = computed<boolean>(() => !!slots.append)
const hasPrependSlot = computed<boolean>(() => !!slots.prepend)


defineExpose({
    handleFormDisableState,
    validate,
    resetValidation
})
</script>

<style scoped>
.input-append_wrapper {
    right: 0;
}

.input-prepend_wrapper {
    left: 0;
}
</style>