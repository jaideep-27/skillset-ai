import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../Games.css';

const ScienceGames = () => {
  const games = [
    {
      title: 'Physics Lab',
      description: 'Interactive physics experiments and simulations',
      icon: '⚛️',
      level: 'intermediate',
      path: '/games/science/physics',
      gradient: 'linear-gradient(135deg, #4D61FC 0%, #00D4FF 100%)',
      accentColor: '#4D61FC'
    },
    {
      title: 'Biology Explorer',
      description: 'Explore biological systems and processes',
      icon: '🧬',
      level: 'intermediate',
      path: '/games/science/biology',
      gradient: 'linear-gradient(135deg, #FF6B9C 0%, #4D61FC 100%)',
      accentColor: '#FF6B9C'
    },
    {
      title: 'Chemistry Lab',
      description: 'Virtual chemistry experiments and reactions',
      icon: '🧪',
      level: 'advanced',
      path: '/games/science/chemistry',
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
        <div className="icon">🧪</div>
        <h1>Science</h1>
        <p>Interactive science experiments and simulations</p>
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

export default ScienceGames;
