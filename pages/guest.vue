<template>
  <v-container class="guest  ">
    <h1>Welcome to the guest</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione consequatur quidem quasi quaerat inventore non doloribus quia temporibus exercitationem deserunt. Eos est animi reiciendis eligendi, quis deserunt aliquid consequatur minima.
      Lorem
    </p>
  </v-container>
</template>
<script setup>
  definePageMeta({
    layout:'dash',
    middleware:'auth'
  })
  
</script>
<style scoped>
.guest{
  min-height: 100%;
}
</style>