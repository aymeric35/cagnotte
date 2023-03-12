<template>
    <button :disabled="disabled || loading" class="btn btn-primary normal-case mt-2 relative" type="submit" v-bind="$attrs">
        <slot>Envoyer</slot>
        <div class="absolute right-0 mr-8">
            <DaisySpinner v-if="loading" width="2" :size="10"></DaisySpinner>
        </div>
    </button>
</template>

<script setup lang="ts">

interface Props {
    disabled: boolean
    loading: boolean
}

const props = defineProps<Props>()

</script>

<style scoped></style>