import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import studyImage from '../../assets/study.png';
import './Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setEmail(''); // Clear the email field
    } catch (error) {
      console.error('Password reset error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later');
          break;
        default:
          setError('An error occurred. Please try again');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-content">
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">
            Enter your email address and we'll send you a link to reset your password
          </p>

          {error && <div className="auth-error">{error}</div>}
          {success && (
            <div className="auth-success">
              Password reset email sent! Check your inbox for further instructions.
            </div>
          )}

          <form onSubmit={handleResetPassword} className="auth-form">
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

            <button 
              type="submit" 
              className="auth-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <p className="auth-footer">
            Remember your password? <Link to="/login">Log in</Link>
          </p>
        </div>
        <div className="auth-image">
          <img src={studyImage} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
