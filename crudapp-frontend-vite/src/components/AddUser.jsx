import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });

    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { name, username, email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        // Basic validation
        if (!name || !username || !email) {
            setError('All fields are required');
            return;
        }

        setIsSubmitting(true);
        
        try {
            await axios.post("http://localhost:8080/user", user);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit user data');
            console.error("Submission error:", err);
        } finally {
            setIsSubmitting(false);
        }
    }

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
                                type={'text'}
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
                                type={'text'}
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
                                type={'email'}
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
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                        <Link className='btn btn-danger btn-sm mx-2' to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
