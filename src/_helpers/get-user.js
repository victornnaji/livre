import * as auth from '_helpers/auth_provider';
import { client } from './client';


async function getUser() {
    let user = null
  
    const token = await auth.getToken()
    if (token) {
      const data = await client('me', {token})
      user = data.user
    }
  
    return user
}

export default getUser;