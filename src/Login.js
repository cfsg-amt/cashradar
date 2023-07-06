import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function Login() {
  const navigate = useNavigate();
  const [passwordInput, setPasswordInput] = useState('');

  const hashedPassword = '$2y$10$P//gcUmHhQ1oLLQYptoYDOAIFJwrjuMJW7bTwue6lG2vhtSXLNC8W';

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (bcrypt.compareSync(passwordInput, hashedPassword)) {
      // password match, navigate to app
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      // password didn't match
      alert('Incorrect password!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Password:
        <input type="password" value={passwordInput} onChange={handlePasswordChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;
