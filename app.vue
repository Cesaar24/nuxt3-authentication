<template>
  <v-app class="h-100 w-100 app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>
<style >
/* .app{
  
} */
</style>

<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()

onMounted(() => {
  const isDarkModeActivated = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (isDarkModeActivated) {
    theme.global.name.value = 'dark'
    /* if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.global.name.value = 'dark'
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme.global.name.value = 'light'
    } */
  }else{
    theme.global.name.value = 'light'
  }
})
</script>