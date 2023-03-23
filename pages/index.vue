<template>
    <div>
        <section class="h-screen">
            <div class="flex justify-center items-center flex-col gap-10 mt-5">
                <progress v-if="pending" class="progress w-56"></progress>
                <div v-else class="grid grid-flow-col gap-5 text-center auto-cols-max">
                    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                        <span class="countdown font-mono text-5xl">
                            <span :style="`--value:${formatedTotal.euros};`"></span>
                            ,
                            <span :style="`--value:${formatedTotal.centimes};`"></span>
                            €
                        </span>
                    </div>
                </div>
                <button class="btn" @click="increment()">Ajouter 10 centimes</button>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { collection, doc, increment as inc, updateDoc } from 'firebase/firestore'

const db = useFirestore();

const { data, pending } = useDocument(doc(collection(db, 'app'), 'data'))
const formatedTotal = computed(() => {
    const total = Number(data.value?.euros).toFixed(2);
    const totalSplit = total.split('.');
    return {
        euros: totalSplit[0],
        centimes: totalSplit[1]
    }
})
const increment = async () => {
    await updateDoc(doc(collection(db, 'app'), 'data'), {
        euros: inc(0.1)
    });
}

</script>

<style scoped></style>