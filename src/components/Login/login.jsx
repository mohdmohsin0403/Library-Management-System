import React, { useState } from 'react';
import { auth } from './firebase.jsx';
import { Link, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css'; // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error message
  const [loggedIn, setLoggedIn] = useState(false); // State for successful login

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth  , email, password);
      console.log('User logged in successfully');
      setLoggedIn(true); // Set the loggedIn state to true upon succe ssful login
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Incorrect email or password. Please try again.'); // Set error message
    }
  };

  // Redirect to the book page if logged in
  if (loggedIn) {
    return <Navigate to="/book" />;
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <p>If you don't have an account?<br></br> <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
}

export default Login;
