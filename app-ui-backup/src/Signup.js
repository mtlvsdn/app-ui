import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasMinLength = password.length >= 8;
    
    return {
      isValid: hasNumber && hasUpperCase && hasMinLength,
      errors: {
        number: !hasNumber && 'Password must contain at least one number',
        upperCase: !hasUpperCase && 'Password must contain at least one uppercase letter',
        length: !hasMinLength && 'Password must be at least 8 characters long'
      }
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = Object.values(passwordValidation.errors)
        .filter(error => error)
        .join(', ');
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // TODO: Handle signup logic here
    console.log('Form submitted:', formData);
    navigate('/login'); // Redirect to login after successful signup
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className={`login-input ${errors.fullName ? 'error' : ''}`}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`login-input ${errors.username ? 'error' : ''}`}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`login-input ${errors.password ? 'error' : ''}`}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className={`login-input ${errors.confirmPassword ? 'error' : ''}`}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="login-button">
            Create Account
          </button>
        </form>
        
        <button 
          onClick={() => navigate('/login')} 
          className="signup-button"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Signup;