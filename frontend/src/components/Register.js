import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css'; // Import the CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', {
        username,
        email,
        password
      });
      alert('Registration successful');
      navigate('/');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <h2>Please enter in your username, email, and then your password</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>
        By registering, you agree to our{' '}
        <a href="/TM.txt" target="_blank" rel="noopener noreferrer">
          Terms and Conditions
        </a>.
      </p>
      <p>Already have an account? <Link to="/">Login here</Link></p>
    </div>
  );
};

export default Register;
