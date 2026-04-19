import Gomb from "./Gomb"

export default function BookTable({ allBooks, onEdit, onDelete }) {
    return (
       <table className="table table-striped table-hover table-dark rounded-2 overflow-hidden mt-3">
            <thead>
                <tr className="text-center">
                    <th>#</th>
                    <th>Cím</th>
                    <th>Szerző</th>
                    <th>Leírás</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allBooks?.map(book => (
                    <tr className="text-center align-middle" key={book.book_id}>
                        <td>{book.book_id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.description}</td>
                        <td>
                            <div className="d-flex justify-content-evenly gap-2">
                                <Gomb szin='btn btn-sm btn-warning' text='Szerkesztés' onClick={() => onEdit(book)} />
                                <Gomb szin='btn btn-sm btn-danger' text='Törlés' onClick={() => onDelete(book)} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}