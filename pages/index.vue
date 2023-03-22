<template>
    <div>
        Hello {{ user?.displayName }}
        <button class="btn" @click="signOutUser"> Se deconnecter</button>
        <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span class="countdown font-mono text-5xl">
                    <span :style="`--value:${formatedTotal.euros};`"></span>
                    ,
                    <span :style="`--value:${formatedTotal.centimes};`"></span>
                    €
                </span>
            </div>
        </div>
        <button @click="increment()">Add 1</button>
        <div>{{ data?.euros }}</div>
    </div>
</template>

<script setup lang="ts">
import { collection, doc, increment as inc, updateDoc } from 'firebase/firestore'

const user = useCurrentUser()
const db = useFirestore();

const data = useDocument(doc(collection(db, 'app'), 'data'))
const formatedTotal = computed(() => {
    const total = Number(data.value?.euros).toFixed(2);
    return {
        euros: total.split('.')[0],
        centimes: total.split('.')[1]
    }
})

const increment = async () => {
    await updateDoc(doc(collection(db, 'app'), 'data'), {
        euros: inc(0.1)
    });
}
</script>

<style scoped></style>