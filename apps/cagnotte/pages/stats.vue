<script setup lang="ts">
const { data, pending } = useFirestoreAPI('users')
const usersList = computed(() => {
  if (data.value) {
    return data.value
  }
})
</script>

<template>
  <section class="min-h-screen flex justify-center items- -mt-16">
    <div class="flex items-center justify-center">
      <progress v-if="pending" class="progress w-56" />
      <div v-else class="stats shadow stats-vertical sm:stats-horizontal">
        <template v-for="(user, name) in usersList" :key="user.id">
          <div class="stat">
            <div class="stat-title">
              {{ name }}
            </div>
            <div class="stat-value">
              {{ Number(user.euros).toFixed(2) }} €
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
