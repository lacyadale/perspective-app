import React, { useState } from 'react';
import { useNavigate }      from 'react-router-dom';
import { useAuth }          from '../auth/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    login(email);
    navigate('/');
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>WheelMate Login</h1>
      <input
        type="email"
        placeholder="you+pro@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}
