import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For your Sunday Demo, use these simple credentials:
    if (email === 'admin@megamart.rw' && password === 'admin123') {
      setIsAdmin(true);
      navigate('/admin');
    } else {
      alert('Invalid Credentials! Access Denied.');
    }
  };

  return (
    <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Admin Access</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Admin Email" 
            style={inputStyle} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Secret Password" 
            style={inputStyle} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" style={loginBtnStyle}>Authorize Login</button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };
const loginBtnStyle = { padding: '12px', backgroundColor: '#212121', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

export default LoginPage;