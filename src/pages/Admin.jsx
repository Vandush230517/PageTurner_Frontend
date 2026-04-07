import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Table from "../components/Table";
import NavBar from "../components/NavBar"

import { getAllUsers } from '../api';

export default function Admin() {
    const { user, loading, onLogout } = useAuth()

    const [allUsers, setAllUsers] = useState(null)
    const [ errorAllUsers, setErrorAllUsers] = useState('')

    useEffect(() => {
        async function loadUsers() {
            const data = await getAllUsers()

            if (!data.error) {
               return setAllUsers(data) 
            }

            return setErrorAllUsers(data.error)
        }
        loadUsers()
    }, [])

    if (loading) {
        return (
            <div className="container py-5">
                <div className="spinner-border text-danger"></div>
            </div>
        )
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to='/' />
    }

    

   return (
    <div style={{ backgroundColor: '#EFCEA8', minHeight: '100vh'}}>
        <NavBar user={user} onLogout={onLogout}/>
        <div className="container py-5">
           <h1>Admin panel</h1>
            <Table allUsers={allUsers}/>
        </div>
    </div>
)

}