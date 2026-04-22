import { createContext, useContext, useEffect, useState } from "react"
import { whoAmI, logout } from "../api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUser() {
            //await new Promise(resolve => setTimeout(resolve, 5000))
            const data = await whoAmI()

            if (data.error) {
                setErrorUser(data.error)
                setLoading(false)
                return
            }

            setUser(data)
            setLoading(false)
        }

        loadUser()
    }, [])

async function onLogout() {
    const data = await logout()

    if (data?.error) {
        setErrorUser(data.error)
        return
    }

    setUser(null)
}

    return (
        <AuthContext.Provider value={{ user, setUser, loading, errorUser, onLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}