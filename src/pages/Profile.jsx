import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useAuth } from '../context/AuthContext'
import { editUsername, editEmail, editPassword, whoAmI } from '../api'

export default function Profile() {
    const { onLogout, setUser } = useAuth()
    const navigate = useNavigate()

    const [user, setLocalUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [showUsernameModal, setShowUsernameModal] = useState(false)
    const [showEmailModal, setShowEmailModal] = useState(false)
    const [showPasswordModal, setShowPasswordModal] = useState(false)

    const [newUsername, setNewUsername] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    const [hiba, setHiba] = useState('')
    const [uzenet, setUzenet] = useState('')

    useEffect(() => {
        async function loadProfile() {
            const data = await whoAmI()
            if (!data.error) {
                setLocalUser(data)
                setUser(data)
            }
            setLoading(false)
        }
        loadProfile()
    }, [])

    function onBooks() {
        navigate('/books')
    }

    async function handleEditUsername() {
        setHiba('')
        setUzenet('')
        const data = await editUsername(newUsername)
        if (data.error) return setHiba(data.error)
        setUzenet(data.message)
        setShowUsernameModal(false)
        const updated = await whoAmI()
        if (!updated.error) {
            setLocalUser(updated)
            setUser(updated)
        }
    }

    async function handleEditEmail() {
        setHiba('')
        setUzenet('')
        const data = await editEmail(newEmail)
        if (data.error) return setHiba(data.error)
        setUzenet(data.message)
        setShowEmailModal(false)
        const updated = await whoAmI()
        if (!updated.error) {
            setLocalUser(updated)
            setUser(updated)
        }
    }

    async function handleEditPassword() {
        setHiba('')
        setUzenet('')
        if (newPassword !== newPassword2) return setHiba('A két jelszó nem egyezik')
        const data = await editPassword(currentPassword, newPassword)
        if (data.error) return setHiba(data.error)
        setUzenet(data.message)
        setShowPasswordModal(false)
    }

    async function handleLogout() {
    await onLogout()
    navigate('/')
}

    if (loading) {
        return (
            <div style={{ backgroundColor: '#EFCEA8', minHeight: '100vh' }}>
                <div className="container py-5">
                    <div className="spinner-border text-danger"></div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ backgroundColor: '#EFCEA8', minHeight: '100vh' }}>
           <NavBar user={user} onLogout={handleLogout} onBooks={onBooks} />

            <div className="container py-5">
                {hiba && <div className="alert alert-danger text-center">{hiba}</div>}
                {uzenet && <div className="alert alert-success text-center">{uzenet}</div>}

                <div className="card p-4 mx-auto" style={{ maxWidth: '600px', backgroundColor: '#f0e5d8', border: 'none', borderRadius: '16px' }}>
                    <h4 className="text-center mb-4 fw-bold">Profil</h4>

                    <div className="mb-3">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="fw-bold">Felhasználónév:</span>
                            <span>{user?.username}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="fw-bold">Email:</span>
                            <span>{user?.email}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="fw-bold">Szerepkör:</span>
                            <span className={`badge ${user?.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                                {user?.role === 'admin' ? 'Admin' : 'Felhasználó'}
                            </span>
                        </div>
                    </div>

                    <hr />

                    <div className="d-grid gap-2">
                        <button className="btn btn-dark" onClick={() => { setHiba(''); setUzenet(''); setShowUsernameModal(true) }}>
                            Felhasználónév módosítása
                        </button>
                        <button className="btn btn-dark" onClick={() => { setHiba(''); setUzenet(''); setShowEmailModal(true) }}>
                            Email módosítása
                        </button>
                        <button className="btn btn-dark" onClick={() => { setHiba(''); setUzenet(''); setShowPasswordModal(true) }}>
                            Jelszó módosítása
                        </button>
                    </div>
                </div>
            </div>

            {showUsernameModal && (
                <div className='modal d-block' tabIndex='-1'>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>Felhasználónév módosítása</h5>
                            {hiba && <div className="alert alert-danger">{hiba}</div>}
                            <label className="form-label fw-bold">Új felhasználónév:</label>
                            <input type="text" className="form-control" placeholder="John Doe" onChange={(e) => setNewUsername(e.target.value)} />
                            <div className="d-flex justify-content-between mt-3">
                                <button className="btn btn-secondary" onClick={() => setShowUsernameModal(false)}>Bezárás</button>
                                <button className="btn btn-warning" onClick={handleEditUsername}>Módosít</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEmailModal && (
                <div className='modal d-block' tabIndex='-1'>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>Email módosítása</h5>
                            {hiba && <div className="alert alert-danger">{hiba}</div>}
                            <label className="form-label fw-bold">Új email:</label>
                            <input type="email" className="form-control" placeholder="example@example.com" onChange={(e) => setNewEmail(e.target.value)} />
                            <div className="d-flex justify-content-between mt-3">
                                <button className="btn btn-secondary" onClick={() => setShowEmailModal(false)}>Bezárás</button>
                                <button className="btn btn-warning" onClick={handleEditEmail}>Módosít</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showPasswordModal && (
                <div className='modal d-block' tabIndex='-1'>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <h5>Jelszó módosítása</h5>
                            {hiba && <div className="alert alert-danger">{hiba}</div>}
                            <label className="form-label fw-bold">Jelenlegi jelszó:</label>
                            <input type="password" className="form-control" placeholder="*****" onChange={(e) => setCurrentPassword(e.target.value)} />
                            <label className="form-label fw-bold mt-2">Új jelszó:</label>
                            <input type="password" className="form-control" placeholder="*****" onChange={(e) => setNewPassword(e.target.value)} />
                            <label className="form-label fw-bold mt-2">Új jelszó mégegyszer:</label>
                            <input type="password" className="form-control" placeholder="*****" onChange={(e) => setNewPassword2(e.target.value)} />
                            <div className="d-flex justify-content-between mt-3">
                                <button className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>Bezárás</button>
                                <button className="btn btn-warning" onClick={handleEditPassword}>Módosít</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}