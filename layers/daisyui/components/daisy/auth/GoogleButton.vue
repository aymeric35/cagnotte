<template>
    <button @click="emit('click')" class="btn normal-case relative" :disabled="disabled || loading">
        <DaisySvgGoogle></DaisySvgGoogle>
        <slot>{{ text }}</slot>
        <div class="absolute right-0 mr-8">
            <DaisySpinner v-if="loading" width="2" :size="10"></DaisySpinner>
        </div>
    </button>
</template>

<script setup lang="ts">

const emit = defineEmits(['click'])

interface Props {
    disabled?: boolean
    loading?: boolean
    text?: string
}

const props = withDefaults(defineProps<Props>(), {
    disabled: false, loading: false, text: "Se connecter avec Google"
})

</script>

<style scoped></style>