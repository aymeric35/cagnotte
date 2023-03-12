<template>
    <div class="alert alert-error shadow-lg">
        <div class="i-ph-warning-circle-fill text-2xl" />
        <div v-html="message"></div>
    </div>
</template>
<script lang="ts" setup>
import { ActiveToast } from '..'

interface Props {
    toast: ActiveToast
    message: String
}
const props = defineProps<Props>()
</script>
<style scoped>
.alert {
    gap: 0.3rem;
}
</style>
