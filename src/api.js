const BACKEND_URL = 'http://localhost:3000/users'

export async function register(email, username, password){
    const res = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, username, password })
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
    const res = await fetch(`${BACKEND_URL}/admin/allUser`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error}
    }

    return await res.json()
}