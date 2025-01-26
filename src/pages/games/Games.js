<<<<<<< HEAD
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DSAIcon,
  MathIcon,
  ElectronicsIcon,
  MechanicalIcon,
  ChemicalIcon,
  CivilIcon,
  NetworkIcon,
  EmbeddedIcon,
  ScienceIcon,
  LanguageIcon
} from '../../components/icons/CategoryIcons';
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SortingVisualizer from './dsa-games/SortingVisualizer';
import GraphVisualizer from './dsa-games/GraphVisualizer';
import NQueens from './dsa-games/NQueens';
import BSTVisualizer from './dsa-games/BSTVisualizer';
import PathfindingVisualizer from './dsa-games/PathfindingVisualizer';
import HeapVisualizer from './dsa-games/HeapVisualizer';
>>>>>>> b070a1a0eaea0899fa172ab27c6f5a1d84d0419f
import './Games.css';

const Games = () => {
  const navigate = useNavigate();
<<<<<<< HEAD

  const categories = [
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      description: 'Visualize and learn DSA concepts interactively',
      icon: DSAIcon,
      level: 'INTERMEDIATE',
      path: '/games/categories/dsa',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #4D61FC 0deg, #00D4FF 180deg, #4D61FC 360deg)',
      accentColor: '#4D61FC'
    },
    {
      id: 'math',
      title: 'Mathematics',
      description: 'Enhance mathematical skills through interactive games',
      icon: MathIcon,
      level: 'INTERMEDIATE',
      path: '/games/categories/math',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #00D4FF 0deg, #22C55E 180deg, #00D4FF 360deg)',
      accentColor: '#00D4FF'
    },
    {
      id: 'electronics',
      title: 'Electronics & Circuits',
      description: 'Interactive circuit design and analysis',
      icon: ElectronicsIcon,
      level: 'INTERMEDIATE',
      path: '/games/categories/electronics',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #FF6B9C 0deg, #4D61FC 180deg, #FF6B9C 360deg)',
      accentColor: '#FF6B9C'
    },
    {
      id: 'mechanical',
      title: 'Mechanical Engineering',
      description: 'Explore mechanical systems and simulations',
      icon: MechanicalIcon,
      level: 'ADVANCED',
      path: '/games/categories/mechanical',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #4D61FC 0deg, #FF6B9C 180deg, #4D61FC 360deg)',
      accentColor: '#4D61FC'
    },
    {
      id: 'chemical',
      title: 'Chemical Engineering',
      description: 'Chemical process simulations and reactions',
      icon: ChemicalIcon,
      level: 'ADVANCED',
      path: '/games/categories/chemical',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #00D4FF 0deg, #FF6B9C 180deg, #00D4FF 360deg)',
      accentColor: '#00D4FF'
    },
    {
      id: 'civil',
      title: 'Civil Engineering',
      description: 'Structural design and analysis games',
      icon: CivilIcon,
      level: 'ADVANCED',
      path: '/games/categories/civil',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #FF6B9C 0deg, #00D4FF 180deg, #FF6B9C 360deg)',
      accentColor: '#FF6B9C'
    },
    {
      id: 'networks',
      title: 'Computer Networks',
      description: 'Network protocols and architecture games',
      icon: NetworkIcon,
      level: 'ADVANCED',
      path: '/games/categories/networks',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #4D61FC 0deg, #22C55E 180deg, #4D61FC 360deg)',
      accentColor: '#4D61FC'
    },
    {
      id: 'embedded',
      title: 'Embedded Systems',
      description: 'Microcontroller and IoT simulations',
      icon: EmbeddedIcon,
      level: 'ADVANCED',
      path: '/games/categories/embedded',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #22C55E 0deg, #4D61FC 180deg, #22C55E 360deg)',
      accentColor: '#22C55E'
    },
    {
      id: 'science',
      title: 'Science',
      description: 'Interactive science experiments and simulations',
      icon: ScienceIcon,
      level: 'INTERMEDIATE',
      path: '/games/categories/science',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #00D4FF 0deg, #22C55E 180deg, #00D4FF 360deg)',
      accentColor: '#00D4FF'
    },
    {
      id: 'language',
      title: 'Language Learning',
      description: 'Improve language skills through interactive games',
      icon: LanguageIcon,
      level: 'BEGINNER',
      path: '/games/categories/language',
      gradient: 'conic-gradient(from 180deg at 50% 50%, #22C55E 0deg, #FF6B9C 180deg, #22C55E 360deg)',
      accentColor: '#22C55E'
    }
  ];

  return (
    <div className="games-page">
      <div className="games-header">
        <h1>Educational Games</h1>
        <p>Learn through interactive games and visualizations across different subjects</p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="category-card glass-morphism"
              onClick={() => navigate(category.path)}
              style={{
                '--category-gradient': category.gradient,
                '--category-accent': category.accentColor
              }}
            >
              <span className={`level-badge ${category.level.toLowerCase()}`}>
                {category.level}
              </span>
              <div className="category-icon">
                <Icon />
              </div>
              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
              <div className="card-blur"></div>
              <div className="hover-indicator"></div>
              <div className="card-glow"></div>
            </div>
          );
        })}
      </div>
=======
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const gameCategories = {
    dsa: {
      title: "Data Structures & Algorithms",
      description: "Visualize and learn DSA concepts interactively",
      level: "Intermediate",
      games: [
        { name: "Sorting Visualizer", component: SortingVisualizer, description: "Visualize different sorting algorithms in action", level: "Beginner" },
        { name: "Binary Search Tree", component: BSTVisualizer, description: "Learn BST operations with interactive visualization", level: "Intermediate" },
        { name: "Graph Algorithms", component: GraphVisualizer, description: "Explore graph traversal and pathfinding", level: "Advanced" },
        { name: "N-Queens Puzzle", component: NQueens, description: "Solve the classic N-Queens problem", level: "Intermediate" },
        { name: "Heap Operations", component: HeapVisualizer, description: "Understand heap data structure operations", level: "Beginner" },
        { name: "Pathfinding Visualizer", component: PathfindingVisualizer, description: "Visualize pathfinding algorithms", level: "Advanced" }
      ]
    },
    math: {
      title: "Mathematics",
      description: "Enhance mathematical skills through interactive games",
      level: "Intermediate",
      games: [
        { name: "Number Theory Explorer", description: "Learn prime numbers, factors, and more", level: "Beginner" },
        { name: "Geometry Quest", description: "Interactive geometry problem solving", level: "Intermediate" },
        { name: "Algebra Adventure", description: "Practice algebraic equations and expressions", level: "Advanced" },
        { name: "Statistics Simulator", description: "Visualize statistical concepts and probability", level: "Intermediate" }
      ]
    },
    programming: {
      title: "Programming Concepts",
      description: "Learn programming fundamentals through games",
      level: "Beginner",
      games: [
        { name: "Code Blocks", description: "Learn programming logic through block-based coding", level: "Beginner" },
        { name: "Debug Detective", description: "Find and fix bugs in code snippets", level: "Intermediate" },
        { name: "Algorithm Race", description: "Race against time to solve coding challenges", level: "Advanced" },
        { name: "Memory Management", description: "Understand computer memory concepts", level: "Intermediate" }
      ]
    },
    science: {
      title: "Science",
      description: "Interactive science experiments and simulations",
      level: "Intermediate",
      games: [
        { name: "Physics Lab", description: "Interactive physics experiments and simulations", level: "Beginner" },
        { name: "Chemistry Mixer", description: "Virtual chemistry lab and reactions", level: "Advanced" },
        { name: "Biology Explorer", description: "Explore biological systems and processes", level: "Beginner" },
        { name: "Circuit Builder", description: "Build and test electronic circuits", level: "Intermediate" }
      ]
    },
    language: {
      title: "Language Learning",
      description: "Improve language skills through interactive games",
      level: "Beginner",
      games: [
        { name: "Word Constructor", description: "Build vocabulary and word recognition", level: "Beginner" },
        { name: "Grammar Guardian", description: "Practice grammar rules interactively", level: "Intermediate" },
        { name: "Sentence Builder", description: "Learn sentence construction and syntax", level: "Advanced" },
        { name: "Language Patterns", description: "Identify and learn language patterns", level: "Intermediate" }
      ]
    }
  };

  const categories = Object.keys(gameCategories).map(key => ({
    name: key,
    title: gameCategories[key].title,
    description: gameCategories[key].description,
    level: gameCategories[key].level
  }));

  const handleGameSelect = (game) => {
    if (game.component) {
      setSelectedGame(game);
      const gameRoute = game.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/games/dsa-games/${gameRoute}`);
    }
  };

  const getGamesForCategory = (category) => {
    return gameCategories[category].games;
  };

  const getCategoryDescription = (category) => {
    return gameCategories[category].description;
  };

  return (
    <div className="games-page">
      {selectedGame ? (
        <div className="games-container">
          <button className="back-button" onClick={() => {
            setSelectedGame(null);
            navigate('/games');
          }}>
            <span>←</span> Back to Games
          </button>
          {React.createElement(selectedGame.component)}
        </div>
      ) : (
        <div className="games-container">
          {selectedCategory ? (
            <>
              <button className="back-button" onClick={() => {
                setSelectedCategory(null);
                navigate('/games');
              }}>
                <span>←</span> Back
              </button>
              <h1>{gameCategories[selectedCategory].title}</h1>
              <p className="description">{getCategoryDescription(selectedCategory)}</p>
              <div className="games-grid">
                {getGamesForCategory(selectedCategory).map((game, index) => (
                  <div
                    key={index}
                    className="game-card"
                    onClick={() => handleGameSelect(game)}
                  >
                    <span className={`difficulty-badge ${game.level.toLowerCase()}`}>
                      {game.level}
                    </span>
                    <h3>{game.name}</h3>
                    <p>{game.description}</p>
                    {!game.component && <span className="coming-soon">Coming Soon</span>}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1>Educational Games</h1>
              <p className="description">
                Explore interactive visualizations and games to master various subjects
              </p>
              <div className="games-grid">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="game-card"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <span className={`difficulty-badge ${category.level.toLowerCase()}`}>
                      {category.level}
                    </span>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
>>>>>>> b070a1a0eaea0899fa172ab27c6f5a1d84d0419f
    </div>
  );
};

export default Games;
