<script setup lang="ts">
import { collection, doc, increment as inc, updateDoc } from 'firebase/firestore'

const db = useFirestore()
const user = useCurrentUser()
const username = user.value?.displayName as string

const { data, pending } = useFirestoreAPI('data')

const formatedTotal = computed(() => {
  const total = Number(data.value?.euros).toFixed(2)
  const totalSplit = total.split('.')
  return {
    euros: totalSplit[0],
    centimes: totalSplit[1],
  }
})
async function increment() {
  await updateDoc(doc(collection(db, 'app'), 'data'), {
    euros: inc(0.1),
  })
  await updateDoc(doc(collection(db, 'app'), 'users'), {
    [`${username}.euros`]: inc(0.1),
  })
}
</script>

<template>
  <div>
    <section class="min-h-screen flex justify-center items-center -mt-16">
      <div class="flex justify-center items-center flex-col gap-10">
        <progress v-if="pending" class="progress w-56" />
        <div v-else class="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span class="countdown font-mono text-5xl">
              <span :style="`--value:${formatedTotal.euros};`" />
              ,
              <span :style="`--value:${formatedTotal.centimes};`" />
              €
            </span>
          </div>
        </div>
        <button class="btn" @click="increment()">
          Ajouter 10 centimes
        </button>
      </div>
    </section>
  </div>
</template>
