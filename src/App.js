// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Profile from './pages/profile/Profile';
import AITutors from './pages/ai-learning/AITutors';
import Games from './pages/games/Games';

// Category Pages
import DSAGames from './pages/games/categories/DSAGames';
import MathGames from './pages/games/categories/MathGames';
import ElectronicsGames from './pages/games/categories/ElectronicsGames';
import MechanicalGames from './pages/games/categories/MechanicalGames';
import ChemicalGames from './pages/games/categories/ChemicalGames';
import CivilGames from './pages/games/categories/CivilGames';
import NetworkGames from './pages/games/categories/NetworkGames';
import EmbeddedGames from './pages/games/categories/EmbeddedGames';
import ScienceGames from './pages/games/categories/ScienceGames';
import LanguageGames from './pages/games/categories/LanguageGames';

// DSA Games
import SortingVisualizer from './pages/games/dsa-games/SortingVisualizer';
import BinarySearchTree from './pages/games/dsa-games/BinarySearchTree';
import GraphAlgorithms from './pages/games/dsa-games/GraphAlgorithms';
import NQueens from './pages/games/dsa-games/NQueens';
import HeapOperations from './pages/games/dsa-games/HeapOperations';
import PathfindingVisualizer from './pages/games/dsa-games/PathfindingVisualizer';
import DSAQuiz from './pages/games/dsa-games/DSAQuiz';
import DSAQuizLanding from './pages/games/dsa-games/DSAQuizLanding';
import NumberTheoryExplorer from './pages/games/math-games/NumberTheoryExplorer';
import GeometryQuest from './pages/games/math-games/GeometryQuest';
import LogicGateSimulator from './pages/games/electronics-games/LogicGateSimulator';
import CircuitBuilder from './pages/games/electronics-games/CircuitBuilder';

import Quizzes from './pages/quizzes/Quizzes';
import Courses from './pages/courses/Courses';
import CourseDetail from './pages/courses/CourseDetail';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import Community from './pages/community/Community';
import './App.css';

function App() {
  const [user] = useAuthState(auth);

  // Helper function to render protected routes
  const protectedRoute = (Component) => {
    return user ? <Component /> : <Login />;
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={protectedRoute(Profile)} />
            <Route path="/ai-tutors" element={protectedRoute(AITutors)} />
            
            {/* Games Routes - Level 1 */}
            <Route path="/games" element={protectedRoute(Games)} />
            
            {/* Games Routes - Level 2 (Categories) */}
            <Route path="/games/categories/dsa" element={protectedRoute(DSAGames)} />
            <Route path="/games/categories/math" element={protectedRoute(MathGames)} />
            <Route path="/games/categories/electronics" element={protectedRoute(ElectronicsGames)} />
            <Route path="/games/categories/mechanical" element={protectedRoute(MechanicalGames)} />
            <Route path="/games/categories/chemical" element={protectedRoute(ChemicalGames)} />
            <Route path="/games/categories/civil" element={protectedRoute(CivilGames)} />
            <Route path="/games/categories/networks" element={protectedRoute(NetworkGames)} />
            <Route path="/games/categories/embedded" element={protectedRoute(EmbeddedGames)} />
            <Route path="/games/categories/science" element={protectedRoute(ScienceGames)} />
            <Route path="/games/categories/language" element={protectedRoute(LanguageGames)} />
            
            {/* DSA Games */}
            <Route path="/games/dsa/sorting-visualizer" element={protectedRoute(SortingVisualizer)} />
            <Route path="/games/dsa/binary-search-tree" element={protectedRoute(BinarySearchTree)} />
            <Route path="/games/dsa/graph-algorithms" element={protectedRoute(GraphAlgorithms)} />
            <Route path="/games/dsa/n-queens-puzzle" element={protectedRoute(NQueens)} />
            <Route path="/games/dsa/heap-operations" element={protectedRoute(HeapOperations)} />
            <Route path="/games/dsa/pathfinding-visualizer" element={protectedRoute(PathfindingVisualizer)} />
            <Route path="/games/dsa/quiz" element={protectedRoute(DSAQuizLanding)} />
            <Route path="/games/dsa/quiz/start" element={protectedRoute(DSAQuiz)} />

            <Route path="/games/math/number-theory-explorer" element={protectedRoute(NumberTheoryExplorer)} />
            <Route path="/games/math/geometry-quest" element={protectedRoute(GeometryQuest)} />
            <Route path="/games/electronics/logic-gate-simulator" element={protectedRoute(LogicGateSimulator)} />
            <Route path="/games/electronics/circuit-builder" element={protectedRoute(CircuitBuilder)} />

            <Route path="/quizzes" element={protectedRoute(Quizzes)} />
            <Route path="/instructor" element={<InstructorDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
