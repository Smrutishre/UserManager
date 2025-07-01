import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './Home.css'; 

export default function Home() {
    const [users, setUsers] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers();
    };

    return (
        <div className="container">
            <div className="py-4">
                <h2 className="text-center mb-4">User Management</h2>
                <table className="table table-hover border shadow-sm rounded">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">S.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className="btn btn-primary btn-sm mx-2" to={`/viewuser/${user.id}`}>
                                        View
                                    </Link>
                                    <Link className="btn btn-outline-warning btn-sm mx-2" to={`/edituser/${user.id}`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-danger btn-sm mx-2" onClick={() => deleteUser(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         </div>
    );
}
