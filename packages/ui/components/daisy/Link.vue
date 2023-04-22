<script setup lang="ts">
interface Props {
  disabled?: boolean
  to?: string
  text?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['click'])
const to = computed(() => props.disabled ? '' : props.to)

const click = () => {
  if (!props.disabled)
    emit('click')
}

const classes = computed<string[]>(() => {
  const classes = ['label-text-alt']
  if (props.disabled)
    classes.push('text-base-300', 'cursor-not-allowed')
  else classes.push('link link-hover text-info')
  return classes
})
</script>

<template>
  <NuxtLink :to="to" :disabled="disabled" :class="classes" @click="click">
    <slot>{{ text }}</slot>
  </NuxtLink>
</template>
