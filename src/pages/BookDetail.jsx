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

    const [showRatingModal, setShowRatingModal] = useState(false)
    const [selectedRating, setSelectedRating] = useState(0)

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

    async function submitRating() {
        if (!selectedRating) {
            return alert('Válassz értékelést!')
        }

        try {
            const res = await fetch(
                `https://nodejs302.dszcbaross.edu.hu/book/rating/${id}`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ rating: selectedRating })
                }
            )

            const data = await res.json()

            if (data.error) {
                return alert(data.error)
            }

            alert('Sikeres értékelés!')

            setBook(prev => ({
                ...prev,
                ratings: data.ratings ?? prev.ratings
            }))

            setShowRatingModal(false)
            setSelectedRating(0)

        } catch (err) {
            console.error(err)
            alert('Hiba történt')
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

                            {user && (
                                <button
                                    className="btn btn-warning"
                                    onClick={() => setShowRatingModal(true)}
                                >
                                    ⭐ Értékelés
                                </button>
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

            {/* ⭐ RATING MODAL */}
            {showRatingModal && (
                <div className='modal d-block' tabIndex='-1'>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">

                            <h5>Könyv értékelése</h5>

                            <label className="form-label fw-bold">
                                Válassz értéket (1–5):
                            </label>

                            <select
                                className='form-select'
                                value={selectedRating}
                                onChange={(e) => setSelectedRating(Number(e.target.value))}
                            >
                                <option value={0}>Válassz...</option>
                                <option value={1}>⭐ 1</option>
                                <option value={2}>⭐ 2</option>
                                <option value={3}>⭐ 3</option>
                                <option value={4}>⭐ 4</option>
                                <option value={5}>⭐ 5</option>
                            </select>

                            <div className="d-flex justify-content-between mt-3">

                                <button
                                    type='button'
                                    className='btn btn-secondary'
                                    onClick={() => setShowRatingModal(false)}
                                >
                                    Bezárás
                                </button>

                                <button
                                    type='button'
                                    className='btn btn-warning'
                                    onClick={submitRating}
                                >
                                    Küldés
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}