import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
        
        <div className="flex flex-col items-center mb-6">
          <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full mb-4 shadow-sm border-2 border-blue-500" />
          <h3 className="text-xl font-semibold text-gray-800">{user.fullName}</h3>
          <p className="text-gray-600 font-medium">@{user.username}</p>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
        </div>

        <button onClick={handleLogout} 
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition font-medium">
          Logout
        </button>
      </div>
    </div>
  );
}