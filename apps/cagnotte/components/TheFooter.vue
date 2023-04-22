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
  <footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <div>
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
  </footer>
</template>
