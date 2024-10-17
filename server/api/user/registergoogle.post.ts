import  { UserRepository } from "~/server/services/user"
/* import { verifyToken } from "../../utils/session" */
import { OAuth2Client } from "google-auth-library"

const config = useRuntimeConfig()
const client = new OAuth2Client(config.clientIdGoogle);

export default defineEventHandler(async (event) => {
  try{
    const body = await readBody(event)

    const userData = await verify(body.token).catch(console.error)
    
    if(userData && userData.email){
      const userDb = UserRepository.verifyLoginWithGoogle(userData.email)

      if(userDb?.exist){
        // crear cookie y actualizar state 
        setCookie(event, "access_token", body.token)
        const {exist,...newUser } = userDb
        return {
          user:newUser,
          token:body.token,
        }
      }else{
        //  Crear usuario crear cookie y actualizar state
        const newUser:User = {
          id: crypto.randomUUID(),
          name:userData.given_name || '' ,
          lastName:userData.family_name || '',
          email:userData.email,
          username:userData.email.slice(0,userData.email.indexOf('@')) || '',
          role: 'User'
        }
        const user = await UserRepository.createWithGoogle(newUser)

        // Crear cookie 
        setCookie(event, "access_token", body.token)
        return {
          user,
          token:body.token,
        }
      }
    }
    /* return {
      token: body.token,
      userData
    } */
    /* return token */
  }catch(err: any){
    throw err
  }
  
})


async function verify(token:string) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.clientIdGoogle,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();

  return payload
  /* const userid = payload['sub']; */
  // If the request specified a Google Workspace domain:
  // const domain = payload['hd'];
}