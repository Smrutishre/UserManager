/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// In Home.jsx
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
}*/import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { name, username, email } = user;

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
        setError(null); // Clear error when user types
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // Basic validation
        if (!name.trim() || !username.trim() || !email.trim()) {
            setError('All fields are required');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/user", user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 200 || response.status === 201) {
                navigate("/");
            } else {
                throw new Error(`Unexpected response: ${response.status}`);
            }
        } catch (err) {
            console.error("Submission error:", err);
            setError(
                err.response?.data?.message || 
                err.message || 
                'Failed to submit user data. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register User</h2>
                    
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Name
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Name'
                                name='name'
                                value={name}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label'>
                                Username
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Username'
                                name='username'
                                value={username}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                E-mail
                            </label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Enter e-mail address'
                                name='email'
                                value={email}
                                onChange={onInputChange}
                                required
                            />
                        </div>
                        <button
                            type='submit'
                            className='btn btn-primary btn-sm mx-2'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Submitting...
                                </>
                            ) : 'Submit'}
                        </button>
                        <Link className='btn btn-danger btn-sm mx-2' to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}