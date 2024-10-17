import  { UserRepository } from "~/server/services/user"
import jwt from "jsonwebtoken"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  try{
    const body = await readBody(event)
    const {isAdmin, ..._user} = body
    const user = await UserRepository.create(_user,isAdmin)

    const token = jwt.sign(user,config.tokenSecret, {
      expiresIn: config.tokenExpiration
    })
    
    setCookie(event, "access_token", token)
    return {
      user,
      token,
    }
  }catch(err: any){
    throw err
  }
  
})