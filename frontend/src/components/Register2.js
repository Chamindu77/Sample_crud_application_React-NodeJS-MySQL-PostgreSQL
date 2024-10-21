//import React from 'react'
import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register2() {

    const navigateTo = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitRegister = async (e) => {
        e.preventDefault();
        try {
            const data = { firstName, lastName, email, password };
            const resp = await axios.post(`http://localhost:4000/api/u/register`, data);
            console.log('Response:', resp.data);

            if (resp.status === 201) {
                console.log('Registration Successful. Redirecting...');
                navigateTo("/");
                window.alert("Registration Successful!");
            } else {
                console.log('Registration failed:', resp.data.message);
                alert("Registration Failed!");
            }
        } catch (error) {
            console.log('Error:', error);
            alert("Registration Failed!");
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#e3faf4' }}>
            <div className="container " >
                <div className="row d-flex justify-content-center align-items-center h-100" >
                    <div className="col-lg-12 col-xl-11" >
                        <div className="card text-black mt-2" style={{
                            borderRadius: '50px',
                            height: '700px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 1.0), 0 6px 20px rgba(0, 0, 0, 1.0)',
                            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                            transition: 'transform 2.0 s'
                        }}>
                            <div className="card-body p-md-1" >
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4" onSubmit={submitRegister}>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="firstName">Your First Name</label>
                                                    <input
                                                        id="firstName"
                                                        name="firstName"
                                                        type="text"
                                                        autoComplete="firstName"
                                                        required
                                                        className="form-control"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        style={{
                                                            boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -6px 20px rgba(0, 0, 0, 0.1)',
                                                            border: '3px solid #e3faf4',
                                                            padding: '10px',
                                                            borderRadius: '15px',
                                                            outline: 'none',
                                                            transition: 'box-shadow 0s ease-in-out'
                                                        }}
                                                        
                                                    />
                                                    
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="lastName">Your Last Name</label>
                                                    <input
                                                        id="lastName"
                                                        name="lastName"
                                                        type="text"
                                                        autoComplete="lastName"
                                                        required
                                                        className="form-control"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        style={{
                                                            boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -6px 20px rgba(0, 0, 0, 0.1)',
                                                            border: '3px solid #e3faf4',
                                                            padding: '10px',
                                                            borderRadius: '15px',
                                                            outline: 'none',
                                                            transition: 'box-shadow 0s ease-in-out'
                                                        }}
                                                    />

                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="email">Your Email</label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        style={{
                                                            boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -6px 20px rgba(0, 0, 0, 0.1)',
                                                            border: '3px solid #e3faf4',
                                                            padding: '10px',
                                                            borderRadius: '15px',
                                                            outline: 'none',
                                                            transition: 'box-shadow 0s ease-in-out'
                                                        }}
                                                       
                                                    />

                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        required
                                                        className="form-control"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        style={{
                                                            boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 -6px 20px rgba(0, 0, 0, 0.1)',
                                                            border: '3px solid #e3faf4',
                                                            padding: '10px',
                                                            borderRadius: '15px',
                                                            outline: 'none',
                                                            transition: 'box-shadow 0s ease-in-out'
                                                        }}
                                                        
                                                    />

                                                </div>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <NavLink to="/" className="text-success">
                                                    Already have an account?
                                                </NavLink>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg">Register</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" >
                                        <img src="https://img.freepik.com/free-vector/team-checklist-concept-illustration_114360-10325.jpg" className="img-fluid" alt="Sample" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
