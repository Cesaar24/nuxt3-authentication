
export default defineNuxtRouteMiddleware( (to, from) => {
  
  /* console.log("auth middleware:",to.name) */
  const user = userStore()
  const isAuthenticate = user.$state.user.credentials.logged
  if(!isAuthenticate && (to.name !== 'login' ) ){
    return navigateTo('/login')
  }

  if(isAuthenticate && (to.name === 'login' || to.name === 'index')){
    return navigateTo('/dashboard')
  }
  
})