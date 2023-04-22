<script setup lang="ts">
import type { RuleCb } from '~~/types'

interface Emits {
  (eventName: 'update:modelValue', modelValue: string): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

interface Props {
  modelValue: string
}

const email = computed({
  set(val: string) {
    emit('update:modelValue', val)
  },
  get() {
    return props.modelValue
  },
})

const rules: RuleCb[] = [(val, testPattern) => testPattern.email(val) || 'Email invalide']
</script>

<template>
  <label class="label">
    <span class="label-text">Email</span>
  </label>
  <DaisyInput v-model="email" class="input-bordered focus:outline-none focus:border-primary"
    placeholder="Entrer votre email" :rules="rules" autocomplete v-bind="$attrs" />
</template>

<style scoped>
</style>
