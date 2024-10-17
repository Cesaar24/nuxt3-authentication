<template>
  <div class="h-100 position-relative">
    <!-- <AppHeader /> -->
    <header 
      class="position-absolute  w-100 "
    >
      <div class="align-center d-flex ">
        <h1 class=" ml-2"><NuxtLink to="/">Authentication</NuxtLink></h1>
      </div>
    </header>
      <slot />
    <!-- <AppFooter /> -->
    <v-footer 
      class="bg-transparent position-absolute bottom-0 w-100"
    >
      <span>@2024</span>
    </v-footer>
    
  </div>
</template>

<script >
export default{
  name:'default',
}
</script>
<style>
a{
  text-decoration: none;
  color: currentcolor;
  padding: 16px;
}
</style>