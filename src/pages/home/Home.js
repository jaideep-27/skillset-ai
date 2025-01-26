import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { FiArrowUp } from 'react-icons/fi';
import './Home.css';

// Import SVG icons
import coursesIcon from '../../assets/feature-icons/courses.svg';
import gamesIcon from '../../assets/feature-icons/games.svg';
import quizzesIcon from '../../assets/feature-icons/quizzes.svg';
import communityIcon from '../../assets/feature-icons/community.svg';

function Home() {
  const navigate = useNavigate();
  
  const features = [
    {
      id: 'courses',
      title: 'Interactive Courses ',
      description: 'Engage with hands-on exercises and real-time feedback to enhance your learning experience',
      icon: coursesIcon,
      path: '/courses'
    },
    {
      id: 'games',
      title: 'Educational Games ',
      description: 'Master concepts through engaging games designed to make learning fun and effective',
      icon: gamesIcon,
      path: '/games'
    },
    {
      id: 'quizzes',
      title: 'Skill Assessment ',
      description: 'Test your knowledge with our adaptive quizzes and get personalized learning recommendations',
      icon: quizzesIcon,
      path: '/quizzes'
    },
    {
      id: 'community',
      title: 'Learning Community ',
      description: 'Connect with fellow learners, share knowledge, and participate in group discussions',
      icon: communityIcon,
      path: '/community'
    }
  ];

  const stats = [
    { value: '50+', label: 'Interactive Courses' },
    { value: '20+', label: 'Learning Games' },
    { value: '95%', label: 'Satisfaction Rate' }
  ];

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <h1>Master New Skills with Interactive Learning</h1>
          <p>Embark on a journey of discovery and growth. Learn, practice, and excel in various skills through engaging challenges and real-world applications </p>
          <div className="hero-buttons">
            <motion.button 
              className="primary-button"
              onClick={() => navigate('/courses')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started 🎯
            </motion.button>
            <motion.button 
              className="secondary-button"
              onClick={() => navigate('/games')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Games 🤖
            </motion.button>
          </div>
        </motion.div>
      </section>

      <section className="features" ref={featuresRef}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="feature-card"
              onClick={() => navigate(feature.path)}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="feature-icon">
                <img src={feature.icon} alt="" aria-hidden="true" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <button className="feature-button">Get Started</button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section 
        className="stats"
        ref={statsRef}
        variants={containerVariants}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-item"
            variants={itemVariants}
          >
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </motion.section>
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FiArrowUp size={28} color="white" />
      </button>
    </div>
  );
}

export default Home;
