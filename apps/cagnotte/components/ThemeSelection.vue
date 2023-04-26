<script setup lang="ts">
const colorMode = useColorMode()
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
]
</script>

<template>
  <label for="my-modal">Thème</label>
  <Teleport to="body">
    <input id="my-modal" type="checkbox" class="modal-toggle">
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box flex flex-col items-center justify-center">
        <label for="my-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <label for="theme-select">Sélectionner un thème</label>
        <select id="theme-select" v-model="colorMode.preference" class="select max-w-xs">
          <option disabled selected>
            Theme
          </option>
          <option v-for="theme of themes" :key="theme">
            {{ theme }}
          </option>
        </select>
      </div>
    </div>
  </Teleport>
</template>
