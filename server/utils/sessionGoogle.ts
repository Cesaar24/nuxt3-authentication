import { OAuth2Client } from "google-auth-library"
import  { UserRepository } from "~/server/services/user"

const config = useRuntimeConfig()
const client = new OAuth2Client(config.clientIdGoogle);
const getUserTokenGoogle = async (event:any) => {
  const cookie = getCookie(event, "access_token")
  if (!cookie) {
    return null
  }
  const body = await verify(cookie).catch(console.error)
  if (!body) {
    
    throw new Error('Google Token Expired ')
  }
  if(body && body.email){
    const user = UserRepository.getUserWithEmail(body.email)
    return user
  }
}

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


export { getUserTokenGoogle }