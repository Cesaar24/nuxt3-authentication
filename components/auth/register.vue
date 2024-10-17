<template>
  <div class=" w-100 text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
    >
      {{ textError }}


    </v-snackbar>
    <v-form 
      class="pt-3 pb-3 px-4 h-100 d-flex flex-column"
      ref="formu"
      @submit.prevent @submit="submit"
    >
      <v-container class="">
        <v-row no-gutters>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="registerF.name" 
              :rules="nameRules"
              label="First name"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="registerF.lastName"
              :rules="nameRules"
              label="Last name"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="registerF.username" 
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="registerF.email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="registerF.password" 
              :rules="passwordRules"
              type="password"
              label="password"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="registerF.confirmPassword"
              :rules="confirmPasswordRules" 
              type="password"
              label="confirm password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="text-start mt-5 pa-3">   
          <input type="checkbox" v-model="registerF.isAdmin"> <span>Admin ?</span>
        </div>
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
          class="text-none ms-4 text-white"
          color="success"
          rounded="lg"
          variant="flat"
          type="submit"
          
        >
          Create Acount
        </v-btn>
      
      </div>
    </v-form>
  </div>
</template>
<script setup lang="ts">
  import { GoogleSignInButton, type CredentialResponse, } from "vue3-google-signin";

  const { register, registerGoogle } = useAuth()
  const textError = ref("")
  const snackbar = ref(false)

  /* Data */
  const formu = ref()
  const registerF = ref({
    name:'',
    lastName:'',
    username:'',
    password:'',
    confirmPassword:'',
    email:'',
    isAdmin:false
  })
  const nameRules = ref([
    (v:string) => !!v || 'Name is required',
    (v:string) => (v && v.length >= 5) || 'Name must be 5 characters',
  ])
  const usernameRules = ref([
  (v:string) => !!v || 'Username is required',
  (v:string) => (v && v.length >= 5) || 'Username must be 5 characters ',
  
  ])
  const emailRules = ref([
  (v:string) => !!v || 'Email is required',
  (v:string) => /^[a-z0-9.-]+@[a-z0-9.-]+\.[a-z]+$/i.test(v) || 'Email must be valid',
  ])
  const passwordRules = ref([
  (v:string) => !!v || 'Password is required',
  (v:string) => (v && v.length >= 5) || 'Password must be 5 characters',
  (v:string) => /[\W]/.test(v) || 'Password sign is required',
  ])
  const confirmPasswordRules = ref([ 
  (v:string) =>  !!v || 'Confirm Password',
  (v:string) => (v === registerF.value.password ) || 'Passwords must match',
  ])

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

  const submit = async () => {
    const isValid = await formu.value.validate()
    if(!isValid.valid) return
    const {confirmPassword, ...dataSend } = registerF.value

    try{
      await register(dataSend)
      /* navigateTo('/dashboard') */
    }catch(err:any){
      textError.value = err.statusMessage
      snackbar.value = true
      console.log("Register err",err)
      return
    }
    
    
  }

</script>
<style >

.v-label.v-field-label{
  color: #222 ;
  opacity: 1;
}
.continue{
  align-items: center;
  border: 1px solid #333;
  border-radius: 8px;
}
.continue:hover{
  background: #333;
  color: white;
}
.submit{
  margin-top: 25px;
}
</style>