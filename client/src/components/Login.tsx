// Login.tsx
import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

const Login: React.FC = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const { token, username, role } = response.data;
      setUser({ token, username, role });
      console.log('Login Response:', response.data);

      const decodedToken = jwt_decode(token);
      console.log('Decoded JWT Payload:', decodedToken);

      navigate('/appelsOffres');
    } catch (error) {
      console.error('Login Error:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <p className="mt-3" style={{ color: 'black' }}>
              <Link to="/forgot-password" style={{ color: 'black' }}>
                Forgot Password?
              </Link>
            </p>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-dark" style={{ marginTop: '10px' }}>
                Login
              </button>
            </div>
            {error && <p className="mt-3 text-danger">{error}</p>}
          </form>
          <p className="mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
