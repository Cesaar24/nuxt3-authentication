
export default defineNuxtRouteMiddleware( (to, from) => {
  
   const user = userStore()
   const isAdmin = user.isAdmin
   /* console.log("admin middleware:",to.name,from)
   console.log("isAdmin:",isAdmin) */

  if(!isAdmin){
    return abortNavigation('Insufficient permissions.')
  }
   
   
 })