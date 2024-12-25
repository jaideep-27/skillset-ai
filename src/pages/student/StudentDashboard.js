import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import './Student.css';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [progress, setProgress] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!auth.currentUser) {
        navigate('/login');
        return;
      }

      try {
        // Fetch enrolled courses
        const enrollmentsQuery = query(
          collection(db, 'enrollments'),
          where('studentId', '==', auth.currentUser.uid)
        );
        const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
        const enrollmentsData = enrollmentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEnrolledCourses(enrollmentsData);

        // Fetch upcoming sessions
        const sessionsQuery = query(
          collection(db, 'sessions'),
          where('enrolledStudentIds', 'array-contains', auth.currentUser.uid)
        );
        const sessionsSnapshot = await getDocs(sessionsQuery);
        const sessionsData = sessionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUpcomingSessions(sessionsData);

        // Fetch progress data
        const progressQuery = query(
          collection(db, 'progress'),
          where('studentId', '==', auth.currentUser.uid)
        );
        const progressSnapshot = await getDocs(progressQuery);
        const progressData = {};
        progressSnapshot.docs.forEach(doc => {
          progressData[doc.data().courseId] = doc.data().progress;
        });
        setProgress(progressData);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [auth.currentUser, db, navigate]);

  return (
    <motion.div 
      className="student-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="dashboard-header">
        <h1>Welcome Back, {auth.currentUser?.displayName}!</h1>
        <button 
          className="browse-courses-btn"
          onClick={() => navigate('/courses')}
        >
          Browse Courses
        </button>
      </header>

      <div className="learning-stats">
        <div className="stat-card">
          <h3>Enrolled Courses</h3>
          <p>{enrolledCourses.length}</p>
        </div>
        <div className="stat-card">
          <h3>Upcoming Sessions</h3>
          <p>{upcomingSessions.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Progress</h3>
          <p>
            {Object.values(progress).length > 0
              ? Math.round(
                  Object.values(progress).reduce((a, b) => a + b, 0) /
                    Object.values(progress).length
                )
              : 0}
            %
          </p>
        </div>
      </div>

      <section className="enrolled-courses">
        <h2>Your Courses</h2>
        <div className="courses-grid">
          {enrolledCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${progress[course.courseId] || 0}%` }}
                ></div>
              </div>
              <h3>{course.courseName}</h3>
              <p>{course.description}</p>
              <div className="course-details">
                <span>Instructor: {course.instructorName}</span>
                <span>Progress: {progress[course.courseId] || 0}%</span>
              </div>
              <button 
                onClick={() => navigate(`/course/${course.courseId}`)}
                className="continue-btn"
              >
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="upcoming-sessions">
        <h2>Upcoming Sessions</h2>
        <div className="sessions-grid">
          {upcomingSessions.map(session => (
            <div key={session.id} className="session-card">
              <h3>{session.title}</h3>
              <p>{session.description}</p>
              <div className="session-details">
                <span>Date: {new Date(session.date).toLocaleDateString()}</span>
                <span>Time: {session.time}</span>
                <span>Instructor: {session.instructorName}</span>
              </div>
              <button 
                onClick={() => navigate(`/session/${session.id}`)}
                className="join-session-btn"
              >
                Join Session
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="ai-chat">
        <h2>AI Learning Assistant</h2>
        <div className="ai-chat-container">
          <p>Need help with your studies? Chat with our AI tutor!</p>
          <button 
            onClick={() => navigate('/ai-chat')}
            className="start-chat-btn"
          >
            Start Chat
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default StudentDashboard;
