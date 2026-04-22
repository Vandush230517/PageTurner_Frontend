import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import NavBar from "../components/NavBar"

import { getAllUsers, userEdit, deleteUser } from '../api';

export default function Admin() {
    const { user, loading, onLogout } = useAuth()

    const [allUsers, setAllUsers] = useState(null)
    const [errorAllUsers, setErrorAllUsers] = useState('')

    const [selectedUser, setSelectedUser] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        async function loadUser() {
            const data = await whoAmI()

            if (data.error) {
                setUser(null)
                setErrorUser(data.error)
            } else {
                setUser(data)
                setErrorUser('')

                fetch("https://nodejs302.dszcbaross.edu.hu/book/userRatedBooks", {
                    credentials: 'include'
                })
                    .then(res => res.ok ? res.json() : [])
                    .then(data => setUserRatedBooks(data))
                    .catch(() => setUserRatedBooks([]))
            }
        }

        loadUser()

        fetch("https://nodejs302.dszcbaross.edu.hu/book/randomBooks")
            .then(res => res.json())
            .then(data => setRandomBooks(data))
            .catch(() => setRandomBooks([]))
        async function loadUsers() {
            const data = await getAllUsers()
            if (!data.error) return setAllUsers(data)
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

    function handleEdit(user) {
        setSelectedUser(user)
        setShowModal(true)
    }

    async function handleDelete(user) {
        setErrorAllUsers('')
        setSelectedUser(user)

        const confirmDelete = window.confirm(`Biztosan törölni akarod a ${user.username} felhasználót?`)
        if (!confirmDelete) return

        const data = await deleteUser(user.user_id)
        if (data.error) {
            setErrorAllUsers(data.error)
            return alert(errorAllUsers)
        }
        return alert('Sikeres törlés')
    }

    async function editUser(user_id) {
        setErrorAllUsers('')
        const data = await userEdit(user_id, username, email, role)
        if (data.error) {
            setErrorAllUsers(data.error)
            return alert(errorAllUsers)
        }
        return alert('Sikeres módosítás')
    }

    return (
        <div style={{ backgroundColor: '#EFCEA8', minHeight: '100vh' }}>
            <NavBar user={user} onLogout={onLogout} />
            <div className="container py-5">
                <h1>Admin panel</h1>
                {errorAllUsers && <div className="alert alert-danger">{errorAllUsers}</div>}

                <div className="container py-4">
                    <div className="row justify-content-between">

                        {/* BAL OLDAL */}
                        <div className="col-12 col-lg-5">
                            <div className="p-3 rounded" style={{ backgroundColor: '#f0e5d8' }}>
                                <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Könyvek:</h4>
                                {randomBooks.map((book, index) => (
                                    <Card
                                        key={`${book.book_id}-${index}`}
                                        book_id={book.book_id}
                                        image={`https://nodejs302.dszcbaross.edu.hu/${book.cover}`}
                                        title={book.title}
                                        author={book.author}
                                        ratings={book.ratings}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* JOBB OLDAL */}
                        <div className="col-12 col-lg-5">
                            <div className="p-3 rounded" style={{ backgroundColor: '#f0e5d8' }}>
                                <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Értékelt könyveim:</h4>
                                {userRatedBooks.map((book, index) => (
                                    <Card
                                        key={`${book.book_id}-${index}`}
                                        book_id={book.book_id}
                                        image={`https://nodejs302.dszcbaross.edu.hu/${book.cover}`}
                                        title={book.title}
                                        author={book.author}
                                        ratings={book.ratings}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                    <Table allUsers={allUsers} onEdit={handleEdit} onDelete={handleDelete} />

                    {showModal && selectedUser && (
                        <div className='modal d-block' tabIndex='-1'>
                            <div className="modal-dialog">
                                <div className="modal-content p-3">
                                    <h5>Szerkesztés</h5>

                                    <label className="form-label fw-bold">Username:</label>
                                    <input type="text" className='form-control' defaultValue={selectedUser.username} placeholder='John Doe' onChange={(e) => setUsername(e.target.value)} />

                                    <label className="form-label fw-bold">Email:</label>
                                    <input type="email" className='form-control' defaultValue={selectedUser.email} placeholder='example@example.com' onChange={(e) => setEmail(e.target.value)} />

                                    <label className="form-label fw-bold">Role:</label>
                                    <input type="text" className='form-control' defaultValue={selectedUser.role} placeholder='admin/user' onChange={(e) => setRole(e.target.value)} />

                                    <div className="d-flex justify-content-between mt-3">
                                        <button type='button' className='btn btn-secondary' onClick={() => setShowModal(false)}>Bezárás</button>
                                        <button type='button' className='btn btn-primary' onClick={() => editUser(selectedUser.user_id)}>Módosít</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}