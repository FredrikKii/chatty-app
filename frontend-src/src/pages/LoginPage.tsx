import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log('Logging in with:', username, password);
   
  };

 
  const continueAsGuest = () => {
    console.log('Continuing as Guest');
    navigate('/channels');
  };

  return (
    <div style={styles.container}>
      <h1>This is cHAPPY!</h1>
      <img src="frontend-src/assets/logo.webp" style={styles.img}></img>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <button onClick={continueAsGuest} style={styles.guestButton}>
        Continue as Guest
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#c3d1d7'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '10px',
    width: '200px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#50E3C2',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  guestButton: {
    marginTop: '20px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  img: {
    width: "100px",
    margin: "10px"
  }
};


export default LoginPage;
