import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add actual authentication logic here
    console.log('Login attempted with:', email, password);
    navigate('/home'); // Redirect to home page after successful login
  };

  const handleSignup = () => {
    navigate('/signup'); // This will navigate to the signup page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome to NotesApp</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <button onClick={handleSignup} className="signup-button">
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;