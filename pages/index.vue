<template>
    <div>
        Hello {{ user?.displayName }}
        <button class="btn" @click="signOutUser"> Se deconnecter</button>
        <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span class="countdown font-mono text-5xl">
                    <span :style="`--value:${euros};`"></span>
                    ,
                    <span :style="`--value:${centimes};`"></span>
                    €
                </span>
            </div>
        </div>
        <button @click="increment()">Add 1</button>
        <div>{{ users?.euros }}</div>
    </div>
</template>

<script setup lang="ts">
import { collection, doc, increment as inc, updateDoc } from 'firebase/firestore'

const db = useFirestore();
const users = useDocument(doc(collection(db, 'app'), 'data'))
const total = useDocument(doc(collection(db, 'app'), 'data'))
const stringifiedTotal = computed(() => Number(Math.round(parseFloat(total.value?.euros + 'e' + 2)) + 'e-' + 2).toFixed(2))
const euros = computed(() => {
    return stringifiedTotal.value.split('.')[0]
})
const centimes = computed(() => {
    return stringifiedTotal.value.split('.')[1]
})

const increment = async () => {
    await updateDoc(doc(collection(db, 'app'), 'data'), {
        euros: inc(0.1)
    });
    console.log(users.value?.euros);
    
}





const user = useCurrentUser()
</script>

<style scoped></style>