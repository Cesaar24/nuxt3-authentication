<template>
  <div class="main">

    <v-card 
      class="card "
      color="blue-grey-darken-4"

    >
      <v-tabs
        v-model="tab"
        align-tabs="start"
        fixed-tabs
        color="success"
      >
        <v-tab value="Login">Login</v-tab>
        <v-tab value="Register">Register</v-tab>
      </v-tabs>
      <div class="content d-flex w-100">
        <Transition name="fade" mode="out-in">
          <!-- <component :is="tab"></component> -->
          <loginForm v-if="tab === 'Login' "></loginForm>
          <register v-else></register>

        </Transition>
        
      </div>
    </v-card>
    
  </div>
</template>



<script setup >
  import loginForm from '~/components/auth/loginForm.vue'
  import register from '~/components/auth/register.vue'

  definePageMeta({
    layout:'default',
    middleware:'auth'
  })
  const tab = ref('Login')
  
</script>



<style scoped>

.main{
  height: 100%;
 /*  background: aqua; */
  align-content: center;
  
  
}
.card{
  margin-top: 44px;
  width: 600px;
  margin: auto;
  border-radius: 12px;
  transition: all 0.5s;
}

.content{
 /*  background: white; */
  height: calc(100% - 48px);
  position: relative;
  min-height: 400px
}
.login{
  width: 100%;
  /* background: #222; */
}
.register{
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
