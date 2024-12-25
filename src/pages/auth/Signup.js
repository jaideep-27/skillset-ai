import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import studyImage from '../../assets/study.png';
import googleIcon from '../../assets/icons/google.svg';
import './Auth.css';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Validate full name
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with full name
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      
      // Send email verification
      await userCredential.user.sendEmailVerification();
      
      // Sign out the user until they verify their email
      await auth.signOut();
      
      alert('A verification email has been sent. Please check your inbox and verify your email before logging in.');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/password accounts are not enabled. Please contact support');
          break;
        case 'auth/weak-password':
          setError('Please choose a stronger password');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection');
          break;
        default:
          setError('An error occurred during signup. Please try again');
      }
    }
  };

  const handleGoogleSignup = async () => {
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      console.log('Starting Google sign in...');
      const result = await signInWithPopup(auth, provider);
      console.log('Sign in successful:', result.user.email);
      navigate('/');
    } catch (error) {
      console.error('Google signup error:', error);
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign up cancelled. Please try again');
          break;
        case 'auth/popup-blocked':
          setError('Pop-up blocked by browser. Please allow pop-ups and try again');
          break;
        case 'auth/cancelled-popup-request':
          setError('Another sign up attempt is in progress');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection');
          break;
        default:
          setError('An error occurred during Google sign up. Please try again');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-content">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">
            Start your personalized learning journey
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a password"
                required
              />
              <small className="password-requirements">
                Password must be at least 8 characters long and contain uppercase, lowercase, and numbers
              </small>
            </div>

            <button type="submit" className="auth-button">
              Sign Up
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <button className="google-button" onClick={handleGoogleSignup}>
            <img src={googleIcon} alt="Google" width="20" />
            Sign up with Google
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
        <div className="auth-image">
          <img src={studyImage} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
