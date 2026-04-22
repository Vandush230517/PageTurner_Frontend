import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Card from '../components/Card'
import { whoAmI, logout } from '../api'

export default function Book() {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')
    const [randomBooks, setRandomBooks] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    const categories = [
        { id: 1, name: 'Sci-Fi' },
        { id: 2, name: 'Fantasy' },
        { id: 3, name: 'Thriller' },
        { id: 4, name: 'Romantikus' },
        { id: 5, name: 'Horror' },
        { id: 6, name: 'Történelmi' },
        { id: 7, name: 'Krimi' },
        { id: 8, name: 'Ifjúsági' },
    ]

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
        loadBooks()
    }, [])

    async function loadBooks() {
        const res = await fetch("https://nodejs302.dszcbaross.edu.hu/book/randomBooks")
        const data = await res.json()
        setRandomBooks(data)
    }

    async function handleCategoryChange(e) {
        const val = e.target.value
        setSelectedCategory(val)

        if (!val) {
            loadBooks()
            return
        }

        const data = await getBooksByCategory(val)
        if (!data.error) setRandomBooks(data)
    }

    async function onLogout() {
        const data = await logout()
        if (data?.error) setErrorUser(data.error)
        setUser(null)
        navigate('/')
    }

    return (
        <div style={{ backgroundColor: '#EFCEA8' }}>
            <NavBar user={user} onLogout={onLogout} />
            {errorUser && <div className="alert alert-danger text-center my-2">{errorUser}</div>}

            <div
                className="d-flex justify-content-center m-5 align-items-start"
                style={{ gap: '400px' }}
            >
                {/* BAL OLDAL */}
                <div
                    className="p-3 rounded"
                    style={{ backgroundColor: '#f0e5d8', width: 'fit-content' }}
                >
                    <option value=''>Összes kategória</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </div>
            </div>

            {/* fehér doboz */}
            <div className="p-4 rounded" style={{ backgroundColor: '#f0e5d8' }}>
                <div className="row g-4">
                    {randomBooks.map((book, index) => (
                        <Card
                            key={`${book.book_id}-${index}`}
                            image={`"https://nodejs302.dszcbaross.edu.hu/${book.cover}`}
                            title={book.title}
                            author={book.author}
                            ratings={book.ratings}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}