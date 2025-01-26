import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../Games.css';

const MechanicalGames = () => {
  const games = [
    {
      title: 'Dynamics Simulator',
      description: 'Simulate mechanical dynamics and motion',
      icon: '⚙️',
      level: 'advanced',
      path: '/games/mechanical/dynamics',
      gradient: 'linear-gradient(135deg, #4D61FC 0%, #00D4FF 100%)',
      accentColor: '#4D61FC'
    },
    {
      title: 'Thermodynamics Lab',
      description: 'Interactive thermodynamics experiments',
      icon: '🌡️',
      level: 'intermediate',
      path: '/games/mechanical/thermodynamics',
      gradient: 'linear-gradient(135deg, #FF6B9C 0%, #4D61FC 100%)',
      accentColor: '#FF6B9C'
    },
    {
      title: 'Machine Design',
      description: 'Design and test mechanical components',
      icon: '🔧',
      level: 'advanced',
      path: '/games/mechanical/machine-design',
      gradient: 'linear-gradient(135deg, #22C55E 0%, #4D61FC 100%)',
      accentColor: '#22C55E'
    }
  ];

  return (
    <div className="category-page">
      <Link to="/games" className="back-button">
        <FiArrowLeft size={20} />
        Back to Categories
      </Link>
      
      <div className="category-header">
        <div className="icon">⚙️</div>
        <h1>Mechanical Engineering</h1>
        <p>Explore mechanical systems and simulations</p>
      </div>

      <div className="games-grid">
        {games.map((game, index) => (
          <Link to={game.path} key={index} className="game-card glass-morphism" style={{
            '--game-gradient': game.gradient,
            '--game-accent': game.accentColor
          }}>
            <span className={`level-tag ${game.level}`}>
              {game.level}
            </span>
            <div className="game-icon">{game.icon}</div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <div className="card-blur"></div>
            <div className="hover-indicator"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MechanicalGames;
