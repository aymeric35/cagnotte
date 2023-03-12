<template>
    <div class="relative">
        <svg :class="svgClasses" viewBox="0 0 50 50">
            <circle class="path" :style="style" cx="25" cy="25" :r="size" fill="none" :stroke-width="width"></circle>
        </svg>

    </div>
</template>

<script setup lang="ts">

interface Props {
    color?: string
    class?: string
    width: string
    size: number
}

const svgClasses = computed<string[]>(() => {
    const classes = ['spinner'];
    if (!props.color) classes.push(props.class);
    return classes;
})

const style = computed(() => {
    if (props.color) return {
        stroke: props.color
    }
    return {}
})

const props = withDefaults(defineProps<Props>(), {
    class: "stroke-base-content",
    width: "5",
    size: 20
});
</script>

<style  scoped>
.spinner {
    animation: rotate 2s linear infinite;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;
}

.spinner .path {
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }

    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
}
</style>