<script setup lang="ts">
interface Props {
  disabled?: boolean
  loading?: boolean
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false, loading: false, text: 'Se connecter avec Google',
})
const emit = defineEmits(['click'])
</script>

<template>
  <button class="btn normal-case relative" :disabled="disabled || loading" @click="emit('click')">
    <DaisySvgGoogle />
    <slot>{{ text }}</slot>
    <div class="absolute right-0 mr-8">
      <DaisySpinner v-if="loading" width="2" :size="10" />
    </div>
  </button>
</template>
