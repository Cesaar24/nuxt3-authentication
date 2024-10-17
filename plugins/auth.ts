export default defineNuxtPlugin(async () => {
  
  const { authenticate } = await useAuth()
  /* console.log("[plugins/auth]--> auth plugin") */
  try{
    await authenticate()
  }catch(err){
    console.log("err plugin: ",err)
  }
  
  
})
