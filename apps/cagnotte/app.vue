<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const user = useCurrentUser()

onMounted(() => {
  watch(user, (user, prevUser) => {
    if (prevUser && !user) {
      // user logged out
      router.push('/login')
    }
    else if (user && typeof route.query.redirect === 'string') {
      // user logged in
      router.push(route.query.redirect)
    }
  })
})
</script>

<template>
  <div>
    <TheHeader v-if="user" />
    <NuxtPage />
    <TheFooter />
  </div>
</template>
