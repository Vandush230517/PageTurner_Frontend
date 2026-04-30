import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { whoAmI, logout, addRating, deleteRating } from '../api'

export default function BookDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')
    const [book, setBook] = useState(null)
    const [selectedRating, setSelectedRating] = useState(0)
    const [uzenet, setUzenet] = useState('')
    const [hiba, setHiba] = useState('')

    useEffect(() => {
        async function loadUser() {
            const data = await whoAmI()
            if (data.error) {
                setUser(null)
                setErrorUser(data.error)
            } else {
                setUser(data)
            }
        }

        async function loadBook() {
            const res = await fetch(`https://nodejs302.dszcbaross.edu.hu/book/getBook/${id}`, {
                credentials: 'include'
            })
            const data = await res.json()
            setBook(data)
        }

        loadUser()
        loadBook()
    }, [id])

    async function onLogout() {
        const data = await logout()
        if (data?.error) setErrorUser(data.error)
        setUser(null)
        navigate('/')
    }

    async function handleRating() {
        setHiba('')
        setUzenet('')
        if (!selectedRating) return setHiba('Válassz értékelést!')
        const data = await addRating(id, selectedRating)
        if (data.error) return setHiba(data.error)
        setUzenet('Sikeres értékelés!')
    }

    async function handleDeleteRating() {
        setHiba('')
        setUzenet('')
        const data = await deleteRating(id)
        if (data.error) return setHiba(data.error)
        setUzenet('Értékelés törölve!')
    }

    if (!book) {
        return (
            <div style={{ backgroundColor: '#EFCEA8', minHeight: '100vh'}}>
                <div className="container py-5">
                    <div className="spinner-border text-danger"></div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ backgroundColor: '#EFCEA8', minHeight: '100vh'}}>
            <NavBar user={user} onLogout={onLogout} />
            {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>}

            <div className="container py-5">
                <button className="btn btn-dark mb-4" onClick={() => navigate(-1)}>← Vissza</button>

                {hiba && <div className="alert alert-danger">{hiba}</div>}
                {uzenet && <div className="alert alert-success">{uzenet}</div>}

                <div className="p-4 rounded" style={{ backgroundColor: '#f0e5d8' }}>
                    <div className="row g-4">
                        
                        {/* BAL OLDAL */}
                        <div className="col-12 col-md-4">
                            <img
                                src={`https://nodejs302.dszcbaross.edu.hu/${book.cover}`}
                                alt={book.title}
                                className="img-fluid rounded mb-3"
                            />
                            <h3 className="fw-bold">{book.title}</h3>
                            <p className="text-muted fs-5">{book.author}</p>
                            <div className="mb-3">
                                <span style={{ fontSize: '1.5rem' }}>⭐ {book.ratings}</span>
                            </div>

                            {/* RATING */}
                            {user && (
                                <div className="mt-3">
                                    <label className="form-label fw-bold">Értékeld a könyvet:</label>
                                    <select
                                        className="form-select mb-2"
                                        value={selectedRating}
                                        onChange={(e) => setSelectedRating(e.target.value)}
                                    >
                                        <option value={0}>Válassz...</option>
                                        <option value={1}>⭐ 1</option>
                                        <option value={2}>⭐⭐ 2</option>
                                        <option value={3}>⭐⭐⭐ 3</option>
                                        <option value={4}>⭐⭐⭐⭐ 4</option>
                                        <option value={5}>⭐⭐⭐⭐⭐ 5</option>
                                    </select>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-warning" onClick={handleRating}>Értékelés</button>
                                        <button className="btn btn-danger" onClick={handleDeleteRating}>Törlés</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* JOBB OLDAL */}
                        <div className="col-12 col-md-8">
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{book.description}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}