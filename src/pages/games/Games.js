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
import './Games.css';

const Games = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default Games;
