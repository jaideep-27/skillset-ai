import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../Games.css';

const MathGames = () => {
  const games = [
    {
      title: 'Calculus Explorer',
      description: 'Interactive calculus visualization and practice',
      icon: '📊',
      level: 'intermediate',
      path: '/games/math/calculus-explorer',
      gradient: 'linear-gradient(135deg, #4D61FC 0%, #00D4FF 100%)',
      accentColor: '#4D61FC'
    },
    {
      title: 'Linear Algebra',
      description: 'Learn matrices and vector operations visually',
      icon: '🔢',
      level: 'advanced',
      path: '/games/math/linear-algebra',
      gradient: 'linear-gradient(135deg, #FF6B9C 0%, #4D61FC 100%)',
      accentColor: '#FF6B9C'
    },
    {
      title: 'Probability Games',
      description: 'Master probability concepts through games',
      icon: '🎲',
      level: 'intermediate',
      path: '/games/math/probability',
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
        <div className="icon">➕</div>
        <h1>Mathematics</h1>
        <p>Enhance mathematical skills through interactive games</p>
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

export default MathGames;
