import { getUserToken } from "../utils/session"
import { getUserTokenGoogle } from "../utils/sessionGoogle"


export default defineEventHandler(async (event) => {
    // ...
 
    let user = await getUserToken(event)
    /* console.log("Middleware auth:",user) */

    if (!user) {
      try{
        user = await getUserTokenGoogle(event)
      }catch(err: any ){
        console.log(err.message)
        /* throw createError({ status: err.status, statusMessage:String(err.message)})   */
      }
      

      if(!user){
        /* console.log("Middleware auth:",!user) */

        event.context.user = null
      }
      if (user) {
        

        event.context.user = user
      }
    }else{

      event.context.user = user
    }

    /* if (user) {
      event.context.user = user
    } */
  
    
})
