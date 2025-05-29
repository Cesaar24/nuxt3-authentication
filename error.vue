<template>
  <v-container>
    <div class="h-screen d-flex flex-column justify-center align-center">
      <div class="pa-4">
        <h2 class="text-h2">{{ error?.statusCode }}</h2>
        <p class="text-xl text-red-lighten-1">{{ error?.statusMessage }}</p>
        <v-btn @click="handleError" variant="tonal" class="mt-2">
          Volver al inicio
        </v-btn>
      </div>
    </div>
  </v-container>
</template>
<script setup lang="ts">
import type { NuxtError } from "#app";

// layouts/dash.vue
definePageMeta({
  layout: "dash",
});

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>
