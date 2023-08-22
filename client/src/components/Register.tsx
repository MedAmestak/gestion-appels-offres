import axios from 'axios';
import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';

interface FormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const Register: React.FC = () => {
  const { setUser } = useUser();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    role: 'demandeur', 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<FormData>('http://localhost:5000/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role, 
      });

          // Update the user context
    setUser({
        username: response.data.username,
        role: response.data.role
      });
  
      console.log(response.data); // Handle success (redirect, display a message, etc.)
      window.location.href = '/login'; // Redirect to the login page
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data); // Handle error
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-4">User Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="demandeur">Demandeur</option>
                <option value="concurrent">Concurrent</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
