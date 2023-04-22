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
    <div v-if="usersList" class="stats stats-horizontal shadow">
      <template v-for="(user, name) in usersList" :key="user.id">
        <div class="stat">
          <div class="stat-title">
            {{ name }}
          </div>
          <div class="stat-value">
            {{ Number(user.euros).toFixed(2) }}
          </div>
          <div class="stat-desc">
            {{ user.id }}
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
