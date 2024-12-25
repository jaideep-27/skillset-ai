import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import './Settings.css';

function Settings() {
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [theme, setTheme] = useState('light');

  const handleSave = (e) => {
    e.preventDefault();
    // Save settings logic here
  };

  return (
    <div className="settings">
      <div className="settings-container">
        <h1>Settings</h1>
        
        <div className="settings-section">
          <h2>Profile Settings</h2>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Display Name</label>
              <input 
                type="text" 
                defaultValue={user?.displayName || ''} 
                placeholder="Enter your display name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={user?.email || ''} 
                disabled 
              />
            </div>
          </form>
        </div>

        <div className="settings-section">
          <h2>Preferences</h2>
          
          <div className="preference-item">
            <div className="preference-info">
              <h3>Notifications</h3>
              <p>Receive push notifications about your progress</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <h3>Email Updates</h3>
              <p>Receive email updates about new features</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={emailUpdates}
                onChange={(e) => setEmailUpdates(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <h3>Theme</h3>
              <p>Choose your preferred theme</p>
            </div>
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              className="theme-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Settings;
