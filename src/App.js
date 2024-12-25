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
import AILearning from './pages/ai-learning/AILearning';
import Games from './pages/games/Games';
import Quizzes from './pages/quizzes/Quizzes';
import Courses from './pages/courses/Courses';
import CourseDetail from './pages/courses/CourseDetail';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import Community from './pages/community/Community';
import './App.css';

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router basename="/skillset-ai">
      <div className="app">
        <Navbar user={user} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={user ? <Profile /> : <Login />} />
            <Route path="/ai-learning" element={user ? <AILearning /> : <Login />} />
            <Route path="/games" element={user ? <Games /> : <Login />} />
            <Route path="/games/dsa-games/:gameName" element={user ? <Games /> : <Login />} />
            <Route path="/quizzes" element={user ? <Quizzes /> : <Login />} />
            <Route path="/instructor" element={<InstructorDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
