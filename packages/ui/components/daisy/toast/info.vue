<script lang="ts" setup>
import type { ActiveToast } from '~~/types/toast'

interface Props {
  toast?: ActiveToast
  message: String
}
defineProps<Props>()
</script>

<template>
  <div class="alert alert-info shadow-lg">
    <IconCSS name="ph:info-fill" />

    <div v-html="message" />
  </div>
</template>

<style scoped>
.alert {
  gap: 0.3rem;
}
</style>
