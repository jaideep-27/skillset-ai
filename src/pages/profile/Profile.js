import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import Dashboard from '../dashboard/Dashboard';
import './Profile.css';

function Profile() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-info">
          <img 
            src={user?.photoURL || '/default-avatar.png'} 
            alt="Profile" 
            className="profile-avatar"
          />
          <div className="profile-details">
            <h1>{user?.displayName || 'Learner'}</h1>
            <p>{user?.email}</p>
          </div>
          <div className="profile-actions">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <Dashboard />
      </div>
    </div>
  );
}

export default Profile;
