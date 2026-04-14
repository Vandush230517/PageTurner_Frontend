import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Card from '../components/Card'
import { whoAmI, logout } from '../api'

export default function Book() {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')

    const [randomBooksAll, setRandomBooksAll] = useState([])

    useEffect(() => {
        async function loadUser() {
            const data = await whoAmI()

            if (data.error) {
                setUser(null)
                setErrorUser(data.error)
            } else {
                setUser(data)
                setErrorUser('')
            }
        }

        loadUser()

        fetch("http://localhost:3000/book/randomBooksAll")
            .then(res => res.json())
            .then(data => setRandomBooksAll(data))
            .catch(() => setRandomBooksAll([]))
    }, [])

    async function onLogout() {
        const data = await logout()
        if (data?.error) setErrorUser(data.error)
        setUser(null)
        navigate('/')
    }

    return (
        <div style={{ backgroundColor: '#EFCEA8', minHeight: '100vh' }}>
            <NavBar user={user} onLogout={onLogout} />

            {errorUser && (
                <div className="alert alert-danger text-center my-2">
                    {errorUser}
                </div>
            )}

            <div className="container mt-4">
                <div
                    className="p-3 rounded"
                    style={{ backgroundColor: '#f0e5d8' }}
                >
                    <h4 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                        Könyvek:
                    </h4>


                    <div className="row">
                        {randomBooksAll.map((book, index) => (
                            <div
                                className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4"
                                key={`${book.book_id}-${index}`}
                            >
                                <Card
                                    image={`http://127.0.0.1:3000/${book.cover}`}
                                    title={book.title}
                                    author={book.author}
                                    ratings={book.ratings}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}