import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/navbar.css'
import logo from '../assets/logo.png'
import NavBar from '../components/NavBar'
import Card from '../components/Card'

import { whoAmI, logout } from '../api'

export default function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')

    //  console.log(errorUser)
    //console.log(user)

    useEffect(() => {
        async function load() {
            const data = await whoAmI()
            // console.log(data)
            if (data.error) {
                setErrorUser(data.error)
            }
            setUser(data)
        }
        load()
    }, [])

    async function onLogout() {
        const data = await logout()
        if (data?.error) {
            setErrorUser(data.error)
        }
        setUser(null)
        navigate('/')
    }

    return (
        <div style={{ backgroundColor: '#EFCEA8', minHeight: '100vh' }}>
            <NavBar user={user} onLogout={onLogout} />
            {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>}

            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1, backgroundColor: '#f0e5d8', padding: '10px', borderRadius: '6px', margin: '10px' }}>
                    <Card image={logo}/>
                    {/* Ide jöhet a bal oldali tartalom */}
                </div>
                <div style={{ flex: 1, backgroundColor: '#f0e5d8', padding: '10px', borderRadius: '6px', margin: '10px' }}>
                    {/* Ide jöhet a jobb oldali tartalom */}
                </div>
            </div>
        </div>

    )
}