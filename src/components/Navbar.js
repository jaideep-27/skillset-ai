import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-left">
          <div className="logo">
            <span className="logo-skillset">Skillset</span>
            <span className="logo-ai">AI</span>
          </div>
        </Link>

        <div className={`nav-right ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="nav-links">
            <Link to="/courses" className={`nav-link ${isActive('/courses')}`}>
              Courses
            </Link>
            <Link to="/games" className={`nav-link ${isActive('/games')}`}>
              Games
            </Link>
            <Link to="/quizzes" className={`nav-link ${isActive('/quizzes')}`}>
              Quizzes
            </Link>
            <Link to="/community" className={`nav-link ${isActive('/community')}`}>
              Community
            </Link>
          </div>

          <button className="profile-btn" onClick={handleProfileClick}>
            <FiUser size={20} />
            Profile
          </button>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
