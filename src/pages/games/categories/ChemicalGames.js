import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../Games.css';

const ChemicalGames = () => {
  const games = [
    {
      title: 'Reaction Simulator',
      description: 'Simulate chemical reactions and processes',
      icon: '⚗️',
      level: 'intermediate',
      path: '/games/chemical/reaction-simulator',
      gradient: 'linear-gradient(135deg, #4D61FC 0%, #00D4FF 100%)',
      accentColor: '#4D61FC'
    },
    {
      title: 'Process Control',
      description: 'Learn chemical process control and optimization',
      icon: '🧪',
      level: 'advanced',
      path: '/games/chemical/process-control',
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
        <div className="icon">⚗️</div>
        <h1>Chemical Engineering</h1>
        <p>Chemical process simulations and reactions</p>
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

export default ChemicalGames;
