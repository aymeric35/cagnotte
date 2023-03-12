<template>
    <NuxtLink :to="to" @click="click" :disabled="disabled" :class="classes">
        <slot>{{ text }}</slot>
    </NuxtLink>
</template>

<script setup lang="ts">


interface Props {
    disabled?: boolean
    to?: string
    text?: string
}

const emit = defineEmits(['click']);
const props = defineProps<Props>();
const to = computed(() => props.disabled ? '' : props.to);


const click = () => {
    if (!props.disabled) emit('click')
}

const classes = computed<string[]>(() => {
    const classes = ['label-text-alt'];
    if (props.disabled) classes.push('text-base-300', 'cursor-not-allowed');
    else classes.push('link link-hover text-info');
    return classes;
})

</script>
