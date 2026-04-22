import Gomb from "./Gomb"

export default function Table({ allUsers, onEdit, onDelete }) {
    return (
       <table className="table table-striped table-hover table-dark rounded-2 overflow-hidden mt-3">
            <thead>
                <tr className="text-center">
                    <th>#</th>
                    <th>username</th>
                    <th>email</th>
                    <th>role</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {allUsers?.map(user => (
                    <tr className="text-center" key={user.user_id}>
                        <td>{user.user_id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className="d-flex justify-content-evenly">
                            <Gomb szin='btn btn-sm btn-warning' text='Szerkesztés' onClick={() => onEdit(user)} />
                            <Gomb szin='btn btn-sm btn-danger px-4' text='Törlés' onClick={() => onDelete(user)} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}