import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function Login() {
  const navigate = useNavigate();
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  const hashedPassword = localStorage.getItem('hashedPassword');

  const handlePasswordChange = (event) => {
    setPasswordInput(event.target.value);
    setLoginError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (bcrypt.compareSync(passwordInput, hashedPassword)) {
      // password match, navigate to app
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      // password didn't match
      setLoginError(true);
    }
  };

  const styles = {
    errorMessage: {
      color: 'red',
      marginTop: '10px',
    },

    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f7f7f7',
      boxSizing: 'border-box',
      padding: '20px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '40px',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#ea5504',
      color: '#fff',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <img src={process.env.PUBLIC_URL + '/static/cfsg.svg'} alt="logo" style={{width: "200px"}}/>
      <br></br>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          請輸入密碼以访问：
          <input 
            type="password" 
            value={passwordInput} 
            onChange={handlePasswordChange} 
            style={styles.input}
          />
        </label>
        {loginError && <p style={styles.errorMessage}>密碼错误，请重试。</p>}
        <input 
          type="submit" 
          value="提交" 
          style={styles.button}
        />
      </form>
    </div>
  );
}

export default Login;
