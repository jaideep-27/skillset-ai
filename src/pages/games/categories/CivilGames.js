import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../Games.css';

const CivilGames = () => {
  const games = [
    {
      title: 'Structural Analysis',
      description: 'Learn structural analysis through interactive simulations',
      icon: '🏗️',
      level: 'intermediate',
      path: '/games/civil/structural-analysis',
      gradient: 'linear-gradient(135deg, #4D61FC 0%, #00D4FF 100%)',
      accentColor: '#4D61FC'
    },
    {
      title: 'Bridge Builder',
      description: 'Design and test bridge structures',
      icon: '🌉',
      level: 'advanced',
      path: '/games/civil/bridge-builder',
      gradient: 'linear-gradient(135deg, #FF6B9C 0%, #4D61FC 100%)',
      accentColor: '#FF6B9C'
    }
  ];

  return (
    <div className="category-page">
      <Link to="/games" className="back-button">
        <FiArrowLeft size={20} />
        Back to Categories
      </Link>
      
      <div className="category-header">
        <div className="icon">🏗️</div>
        <h1>Civil Engineering</h1>
        <p>Structural design and analysis games</p>
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

export default CivilGames;
