import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateUsername, validateEmail, validatePassword, validateFullName } from '../utils/validation';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  // Input fieldile data store cheyyan
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: ''
  });

  // Validation errors store cheyyan
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  // User type cheyyumpol ulla real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let errorMsg = '';
    if (name === 'username') errorMsg = validateUsername(value);
    if (name === 'email') errorMsg = validateEmail(value);
    if (name === 'password') errorMsg = validatePassword(value);
    if (name === 'fullName') errorMsg = validateFullName(value);

    setErrors({ ...errors, [name]: errorMsg });
  };

  // Form Submit cheyyumpol
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    // Submit cheyyumpol ellam onnukoodi validate cheyyunnu
    const uErr = validateUsername(formData.username);
    const eErr = validateEmail(formData.email);
    const pErr = validatePassword(formData.password);
    const fErr = validateFullName(formData.fullName);

    if (uErr || eErr || pErr || fErr) {
      setErrors({ username: uErr, email: eErr, password: pErr, fullName: fErr });
      return;
    }

    // AuthContext-ile register function call cheyyunnu
    const result = await register(formData);
    
    if (result.success) {
      alert(result.message); // Success aayal alert kanikkum
      navigate('/login');    // Ennittu login page-lekku pokum
    } else {
      setApiError(result.message); // API error (eg: Username already exists)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
        
        {apiError && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-sm text-center">{apiError}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded outline-none focus:ring-2 
              ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`} />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded outline-none focus:ring-2 
              ${errors.username ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`} />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded outline-none focus:ring-2 
              ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange}
              className={`mt-1 block w-full p-2 border rounded outline-none focus:ring-2 
              ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`} />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button type="submit" disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
            {isLoading ? 'Registering...' : 'Create Account'}
          </button>
        </form>
        
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}