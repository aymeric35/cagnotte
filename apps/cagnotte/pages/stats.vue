<script setup lang="ts">
const { data, pending } = useFirestoreAPI('users')
const usersList = computed(() => {
  if (data.value) {
    return data.value
  }
})
</script>

<template>
  <section>
    <div class="flex items-center justify-center mt-12">
      <div v-if="usersList" class="stats stats-horizontal shadow grid-flow-row sm:grid-flow-column">
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
