import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import studyImage from '../../assets/study.png';
import googleIcon from '../../assets/icons/google.svg';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        setError('Please verify your email before logging in. Check your inbox for the verification link.');
        // Option to resend verification email
        const resend = window.confirm('Would you like us to resend the verification email?');
        if (resend) {
          await userCredential.user.sendEmailVerification();
          alert('Verification email has been resent. Please check your inbox.');
        }
        await auth.signOut();
        return;
      }
      
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled. Please contact support');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email. Please sign up first');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection');
          break;
        default:
          setError('An error occurred during login. Please try again');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      console.log('Starting Google sign in...', { 
        authDomain: auth.config.authDomain,
        apiKey: auth.config.apiKey 
      });
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign in successful:', result.user.email);
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', {
        code: error.code,
        message: error.message,
        customData: error.customData,
        stack: error.stack
      });
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign in cancelled. Please try again');
          break;
        case 'auth/popup-blocked':
          setError('Pop-up blocked by browser. Please allow pop-ups and try again');
          break;
        case 'auth/cancelled-popup-request':
          setError('Another sign in attempt is in progress');
          break;
        case 'auth/unauthorized-domain':
          setError('This domain is not authorized for Google Sign-in. Please contact support.');
          console.error('Unauthorized domain error. Please check Firebase Console authorized domains.');
          break;
        case 'auth/internal-error':
          setError('An internal error occurred. Please check console for details.');
          break;
        default:
          setError(`Google Sign-in Error: ${error.message}`);
          console.error('Detailed error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-content">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">
            Don't have an account yet? <Link to="/signup">Sign Up</Link>
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="remember-forgot">
              <label className="remember-me">
                <input type="checkbox" disabled={isSubmitting} />
                Remember me
              </label>
              <Link to="/forgot" className="forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="auth-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <button 
            className="google-button" 
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
          >
            <img src={googleIcon} alt="Google" width="20" />
            Sign in with Google
          </button>
        </div>
        <div className="auth-image">
          <img src={studyImage} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Login;
