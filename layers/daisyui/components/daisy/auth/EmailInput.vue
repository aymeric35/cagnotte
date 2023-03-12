<template>
    <label class="label">
        <span class="label-text">Email</span>
    </label>
    <DaisyInput v-model="email" class="input-bordered focus:outline-none focus:border-primary"
        placeholder="Entrer votre email" :rules="[(val, testPattern) => testPattern.email(val) || 'Email invalide']"
        autocomplete v-bind="$attrs" />
</template>

<script setup lang="ts">


interface Emits {
    (eventName: "update:modelValue", modelValue: string): void,
}

const emit = defineEmits<Emits>()

interface Props {
    modelValue: string
}

const props = defineProps<Props>()

const email = computed({
    set(val) {
        emit('update:modelValue', val)
    },
    get() {
        return props.modelValue
    }
})

</script>

<style scoped></style>