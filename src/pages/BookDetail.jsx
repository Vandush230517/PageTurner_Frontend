import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { whoAmI, logout } from '../api'

export default function BookDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')
    const [book, setBook] = useState(null)

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
            try {
                const res = await fetch(
                    `https://nodejs302.dszcbaross.edu.hu/book/getBook/${id}`,
                    { credentials: 'include' }
                )
                const data = await res.json()
                setBook(data)
            } catch (err) {
                console.error(err)
            }
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

    async function handleRating(value) {
        try {
            const res = await fetch(
                `https://nodejs302.dszcbaross.edu.hu/book/rating/${id}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rating: value })
                }
            )

            const data = await res.json()

            if (data.error) {
                return alert(data.error)
            }

            alert('Értékelés elküldve!')

            setBook(prev => ({
                ...prev,
                ratings: data.ratings ?? prev.ratings
            }))

        } catch (err) {
            console.error(err)
            alert('Hiba történt értékelés közben')
        }
    }

    if (!book) {
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
            <NavBar user={user} onLogout={onLogout} />
            
            {errorUser && (
                <div className="alert alert-danger text-center my-2">
                    {errorUser}
                </div>
            )}

            <div className="container py-5">
                <button
                    className="btn btn-dark mb-4"
                    onClick={() => navigate(-1)}
                >
                    ← Vissza
                </button>

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
                                <span style={{ fontSize: '1.5rem' }}>
                                    ⭐ {book.ratings}
                                </span>
                            </div>

                            {/* RATING */}
                            {user && (
                                <div>
                                    <h6 className="mb-2">Értékelés:</h6>

                                    {[1, 2, 3, 4, 5].map(num => (
                                        <button
                                            key={num}
                                            className="btn btn-outline-warning me-2 mb-2"
                                            onClick={() => handleRating(num)}
                                        >
                                            ⭐ {num}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* JOBB OLDAL */}
                        <div className="col-12 col-md-8">
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                                {book.description}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}