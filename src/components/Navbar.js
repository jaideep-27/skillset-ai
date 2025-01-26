import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { FiMenu, FiX, FiUser, FiArrowUp } from 'react-icons/fi';
import './Navbar.css';
import logo from './icons/skillsetai_logo.png';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
=======
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
>>>>>>> b070a1a0eaea0899fa172ab27c6f5a1d84d0419f
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  useEffect(() => {
<<<<<<< HEAD
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
=======
>>>>>>> b070a1a0eaea0899fa172ab27c6f5a1d84d0419f
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleProfileClick = () => {
    navigate('/profile');
  };

<<<<<<< HEAD
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="nav-left">
            <div className="logo">
              <img src={logo} alt="SkillsetAI Logo" className="logo-image" />
            </div>
          </Link>

          <div className={`nav-right ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="nav-links">
              <Link to="/courses" className={`nav-link ${isActive('/courses')}`}>
                Courses
              </Link>
              <Link to="/ai-tutors" className={`nav-link ${isActive('/ai-tutors')}`}>
                AI Tutors
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
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>
      
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      <div 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FiArrowUp />
      </div>
    </>
=======
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
>>>>>>> b070a1a0eaea0899fa172ab27c6f5a1d84d0419f
  );
}

export default Navbar;
