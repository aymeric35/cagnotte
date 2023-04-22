<script setup lang="ts">
// import { minifyIdentity } from '@nuxt-fullstack-starter/lib'

export interface AvatarUser {
  name: string | null | undefined
  email: string | null | undefined
  image: string | null | undefined
}

const props = defineProps({
  user: {
    type: Object as PropType<AvatarUser>,
    required: true,
  },
})
</script>

<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-ghost btn-circle avatar placeholder">
      <div v-if="user.image" class="w-8 rounded-full">
        <img :src="user.image">
      </div>
      <div v-else class="bg-neutral-focus text-neutral-content rounded-full w-8">
        <!-- <span>{{ minifyIdentity(user.name || user.email || "") }}</span> -->
      </div>
    </label>
    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
      <slot />
    </ul>
  </div>
</template>
