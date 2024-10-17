<template>
  <div>
    <h1>Welcome to the homepage</h1>
   
  </div>
</template>
<script setup>
  definePageMeta({
    layout:'default',
    middleware:'auth'
  })
  
</script>