const BACKEND_URL = 'https://nodejs302.dszcbaross.edu.hu/users'
const BACKEND_URL_ADMIN = 'https://nodejs302.dszcbaross.edu.hu/admin'

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

    return {}
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


export async function deleteUser(user_id) {
    const res = await fetch(`${BACKEND_URL_ADMIN}/admin/delete/${user_id}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function userEdit(user_id, username, email, role) {
    const res = await fetch(`${BACKEND_URL_ADMIN}/admin/edit/${user_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, role })
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function getAllBooks() {
    const res = await fetch(`${BACKEND_URL_ADMIN}/allBooks`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function deleteBook(book_id) {
    const res = await fetch(`${BACKEND_URL_ADMIN}/admin/book/delete/${book_id}`, {
        method: 'DELETE',
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function bookEdit(book_id, title, author, categories_id, description) {
    const res = await fetch(`${BACKEND_URL_ADMIN}/admin/book/edit/${book_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ title, author, categories_id, description })
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function createBook(formData) {
    const res = await fetch(`https://nodejs302.dszcbaross.edu.hu/book/createBook`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function getBooksByCategory(categories_id) {
    const res = await fetch(`https://nodejs302.dszcbaross.edu.hu/book/category/${categories_id}`, {
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function searchBooks(query) {
    const res = await fetch(`https://nodejs302.dszcbaross.edu.hu/book/search/${query}`, {
        credentials: 'include'
    })

    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }

    return await res.json()
}

export async function editUsername(username) {
    const res = await fetch(`${BACKEND_URL}/editUsername`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username })
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function editEmail(email) {
    const res = await fetch(`${BACKEND_URL}/editEmail`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email })
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}

export async function editPassword(currentPassword, newPassword) {
    const res = await fetch(`${BACKEND_URL}/editPassword`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword })
    })
    if (!res.ok) {
        const data = await res.json()
        return { error: data?.error }
    }
    return await res.json()
}