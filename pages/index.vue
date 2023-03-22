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
        <select class="select w-full max-w-xs" v-model="colorMode.preference">
            <option disabled selected>Theme</option>
            <option v-for="theme of themes" :key="theme">{{ theme }}</option>
        </select>
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

const colorMode = useColorMode();
const themes = [
  'system',
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
];
</script>

<style scoped></style>