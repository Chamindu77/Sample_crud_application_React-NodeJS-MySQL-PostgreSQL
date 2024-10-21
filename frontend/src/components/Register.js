import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
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
    <div className="min-vh-5 d-flex flex-column justify-content-center py-5 mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card border-success" style={{ width:'450px', height: '500px', borderWidth: '3px' }}>
              <div className="card-header text-center font-weight-bold h2">Sign up</div>
              <div className="card-body">
                <form onSubmit={submitRegister}>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="firstName"
                      required
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="lastName"
                      required
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <button
                      type="submit"
                      className="btn btn-success w-100"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
                <div className="text-center mt-1">
                  <NavLink to="/" className="text-success">
                    Already have an account?
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
