import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../Games.css';

const DSAGames = () => {
  const games = [
    {
      title: 'Sorting Visualizer',
      description: 'Visualize different sorting algorithms in action',
      icon: '📊',
      level: 'beginner',
      path: '/games/dsa/sorting-visualizer',
      gradient: 'linear-gradient(135deg, #4D61FC 0%, #00D4FF 100%)',
      accentColor: '#4D61FC'
    },
    {
      title: 'Binary Search Tree',
      description: 'Learn BST operations with interactive visualization',
      icon: '🌳',
      level: 'intermediate',
      path: '/games/dsa/binary-search-tree',
      gradient: 'linear-gradient(135deg, #00D4FF 0%, #FF6B9C 100%)',
      accentColor: '#00D4FF'
    },
    {
      title: 'Graph Algorithms',
      description: 'Explore graph traversal and pathfinding',
      icon: '🔍',
      level: 'advanced',
      path: '/games/dsa/graph-algorithms',
      gradient: 'linear-gradient(135deg, #FF6B9C 0%, #4D61FC 100%)',
      accentColor: '#FF6B9C'
    },
    {
      title: 'N-Queens Puzzle',
      description: 'Solve the classic N-Queens problem',
      icon: '♕',
      level: 'intermediate',
      path: '/games/dsa/n-queens-puzzle',
      gradient: 'linear-gradient(135deg, #4D61FC 0%, #FF6B9C 100%)',
      accentColor: '#4D61FC'
    },
    {
      title: 'Heap Operations',
      description: 'Understand heap data structure operations',
      icon: '📊',
      level: 'beginner',
      path: '/games/dsa/heap-operations',
      gradient: 'linear-gradient(135deg, #00D4FF 0%, #22C55E 100%)',
      accentColor: '#00D4FF'
    },
    {
      title: 'Pathfinding Visualizer',
      description: 'Visualize pathfinding algorithms in action',
      icon: '🗺️',
      level: 'intermediate',
      path: '/games/dsa/pathfinding-visualizer',
      gradient: 'linear-gradient(135deg, #22C55E 0%, #4D61FC 100%)',
      accentColor: '#22C55E'
    },
    {
      title: 'DSA Quiz',
      description: 'Test your DSA knowledge with interactive quiz',
      icon: '📝',
      level: 'intermediate',
      path: '/games/dsa/quiz',
      gradient: 'linear-gradient(135deg, #FF6B9C 0%, #22C55E 100%)',
      accentColor: '#FF6B9C'
    }
  ];

  return (
    <div className="category-page games-page">
      <Link to="/games" className="back-button">
        <FiArrowLeft size={20} />
        Back to Categories
      </Link>
      
      <div className="category-header games-header">
        <div className="icon">💎</div>
        <h1>Data Structures & Algorithms</h1>
        <p>Visualize and learn DSA concepts interactively</p>
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

export default DSAGames;
