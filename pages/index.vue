<template>
    <div>
        Hello {{ user?.displayName }}
        <button class="btn" @click="signOutUser"> Se deconnecter</button>
        <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span class="countdown font-mono text-5xl">
                    <span :style="`--value:${countEuros};`"></span>
                    ,
                    <span :style="`--value:${countCentimes};`"></span>
                    €
                </span>
            </div>
        </div>
        <button @click="increment()">Add 1</button>
    </div>
</template>

<script setup lang="ts">

const countCentimes = ref(0);
const countEuros = ref(0);

const increment = () => {
    if (countCentimes.value !== 90) {
        countCentimes.value += 10
    } else {
        countCentimes.value = 0
        countEuros.value += 1
    }
}

const user = useCurrentUser()

</script>

<style scoped></style>