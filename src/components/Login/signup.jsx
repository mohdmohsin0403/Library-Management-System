import React, { useState } from 'react';
import { auth  } from './firebase.jsx'; // Import Firestore from firebase
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { Link, Navigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Add state for user's name
  const [error, setError] = useState(null);
  const [signedUp, setSignedUp] = useState(false);

  const handleSignup = async () => {
    try {
      // Create user account
        await createUserWithEmailAndPassword(auth , email, password);

        console.log('User signed up successfully');
        setSignedUp(true);
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Error signing up. Please try again.');
    }
  };

  if (signedUp) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div> */}
        <button onClick={handleSignup} className="signup-button">
          Sign Up
        </button>
        <p>
          Already have an account?<br></br> <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
