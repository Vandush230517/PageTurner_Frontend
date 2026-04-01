const BACKEND_URL = 'http://localhost:3000/users'
const BACKEND_URL_ADMIN = 'http://localhost:3000/admin'

export async function register(username, password, email){
    const res = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password, email})
    })
    //console.log(res);

    const data = await res.json()
    if(data.error){
        return data
    }
    return data
}

export async function login(email, password){
    const res = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    })
   // console.log(res);
  
    const data = await res.json()
    if(data.error){
        return data
    }
    return data
}

export async function whoAmI() {
    const res = await fetch(`${BACKEND_URL}/whoami`, {
        method: 'GET',
        credentials: 'include'
    })

   // console.log(res)
   if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
   }

   return await res.json() 
}

export async function logout() {
    const res = await fetch(`${BACKEND_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
   }

}

export async function getAllUsers() {
    const res = await fetch(`${BACKEND_URL_ADMIN}/allUser`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error}
    }

    return await res.json()
}