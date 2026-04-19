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
            const res = await fetch(`http://localhost:3000/book/getBook/${id}`, {
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

                <div className="p-4 rounded" style={{ backgroundColor: '#f0e5d8' }}>
                    <div className="row g-4">
                        
                        {/* BAL OLDAL - kép, cím, szerző, értékelés */}
                        <div className="col-12 col-md-4">
                            <img
                                src={`http://127.0.0.1:3000/${book.cover}`}
                                alt={book.title}
                                className="img-fluid rounded mb-3"
                            />
                            <h3 className="fw-bold">{book.title}</h3>
                            <p className="text-muted fs-5">{book.author}</p>
                            <div>
                                <span style={{ fontSize: '1.5rem' }}>⭐ {book.ratings}</span>
                            </div>
                        </div>

                        {/* JOBB OLDAL - leírás */}
                        <div className="col-12 col-md-8">
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>{book.description}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}