<script setup lang="ts">
import type { RuleCb } from '~~/types'

interface Emits {
  (eventName: 'update:modelValue', modelValue: string): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

interface Props {
  modelValue: string
  shouldBeEqualsTo?: string
}

const password = computed({
  set(val: string) {
    emit('update:modelValue', val)
  },
  get() {
    return props.modelValue
  },
})

const isConfirmInput = computed<boolean>(() => typeof props.shouldBeEqualsTo === 'string')

const rules = computed<RuleCb[]>(() => {
  if (isConfirmInput.value) {
    return [val => val.length > 0 || 'Confirmation du mot de passe requis', val => val === props.shouldBeEqualsTo || 'Le mot de passe doit correspondre']
  }
  return [val => val.length > 0 || 'Mot de passe requis']
})
</script>

<template>
  <label class="label">
    <span class="label-text">{{ isConfirmInput ? 'Confirmer le mot de passe' : 'Mot de passe' }}</span>
  </label>
  <DaisyInput v-model="password" class="input-bordered focus:outline-none focus:border-primary" type="password"
    placeholder="••••••••" :rules="rules" autocomplete v-bind="$attrs" />
</template>

<style scoped>
</style>
