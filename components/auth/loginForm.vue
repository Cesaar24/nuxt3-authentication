<template>
  <div class=" w-100 text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      {{ textError }}


    </v-snackbar>
    <v-form ref="formu" class="pt-3 pb-3 px-4 h-100 d-flex flex-column"   @submit.prevent @submit="handleLogin">
      <v-container class="">
        <v-row no-gutters class="mb-10">
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="loginF.email"
              :rules="emailRules"
              label="E-mail"
              required
              color="success"
            ></v-text-field>
           
          </v-col>
        </v-row>
        <v-row no-gutters >
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="loginF.password"
              :rules="passwordRules"
              type="password"
              label="Password"
              required
              color="success"

            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider class="mt-5 border-opacity-100 pa-3" >OR  </v-divider>
        <div class="  ">
          <!-- <div class="continue d-flex cursor-pointer pa-1">
            <img src="/gmail-logo.png " alt="gmail" width="50px" height="50px">
            <span class="ml-3">Continue with Google</span>
          </div> -->
          <GoogleSignInButton
            @success="handleLoginSuccess"
            @error="handleLoginError"
          ></GoogleSignInButton>
        </div>
      </v-container>
      <div class="submit">
        <v-btn
          type="submit"
          class="text-none ms-4 "
          color="success"
          rounded="lg"
          variant="flat"
        >
          Login
        </v-btn>
      
      </div>
    </v-form>
  </div>
</template>
<script setup lang="ts">
import { GoogleSignInButton, type CredentialResponse, } from "vue3-google-signin";

const { login , registerGoogle} = useAuth()

const formu = ref()
const snackbar = ref(false)
const textError = ref("")

const loginF = ref({
  email:'',
  password:''
})

const emailRules = ref([
  (v:string) => !!v || 'Email is required',
  (v:string) => /^[a-z0-9.-]+@[a-z0-9.-]+\.[a-z0-9]+$/i.test(v) || 'Email must be valid'
])
const passwordRules = ref([
  (v:string)=> !!v || 'password is required',
  (v:string) => (v && v.length >= 5) || 'Name must be 5 characters',
  (v:string) => /[\W]/.test(v) || 'password sign is required',
])

/* methods */
const handleLogin = async () => {
  const isValid = await formu.value.validate()
  if(!isValid.valid) return

  await login(loginF.value).then((response)=>{

  }).catch((error)=>{
    textError.value = error.statusMessage
    snackbar.value = true
    console.log(error.statusMessage)
  })

  /* try{
    await login(loginF.value)
    navigateTo('/dashboard')
  }catch(err){
    console.log("Login err",err.statusMessage)
    return
  } */
}

const handleLoginSuccess = async (response: CredentialResponse ) => {
  const { credential } = response;
  console.log("Access Token", credential);
  try{
    await registerGoogle({token:credential})
    /* navigateTo('/dashboard') */
  }catch(err){
    console.log("Register err",err)
    return
  }

};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>
<style >
.v-label.v-field-label{
  color: currentColor !important; 
}
</style>