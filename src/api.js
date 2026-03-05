const BACKEND_URL = 'http://127.0.0.1:3000/users'

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
        body: JSON.stringify({ email, password })
    })
    //console.log(res);
    console.log(res);
    const data = await res.json()
    if(data.error){
        return data
    }
    return data
}