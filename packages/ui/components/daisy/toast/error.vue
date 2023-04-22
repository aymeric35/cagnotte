<script lang="ts" setup>
import type { ActiveToast } from '~~/types/toast'

interface Props {
  toast?: ActiveToast
  message: String
}
defineProps<Props>()
</script>

<template>
  <div class="alert alert-error shadow-lg">
    <IconCSS name="ph:warning-circle-fill" />
    <div v-html="message" />
  </div>
</template>

<style scoped>
.alert {
  gap: 0.3rem;
}
</style>
