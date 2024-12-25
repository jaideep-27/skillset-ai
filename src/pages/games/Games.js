import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SortingVisualizer from './dsa-games/SortingVisualizer';
import GraphVisualizer from './dsa-games/GraphVisualizer';
import NQueens from './dsa-games/NQueens';
import BSTVisualizer from './dsa-games/BSTVisualizer';
import PathfindingVisualizer from './dsa-games/PathfindingVisualizer';
import HeapVisualizer from './dsa-games/HeapVisualizer';
import './Games.css';

const Games = () => {
  const navigate = useNavigate();
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
    </div>
  );
};

export default Games;
