import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import './Instructor.css';

const InstructorDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchInstructorData = async () => {
      if (!auth.currentUser) {
        navigate('/login');
        return;
      }

      try {
        // Fetch live sessions
        const sessionsQuery = query(
          collection(db, 'sessions'),
          where('instructorId', '==', auth.currentUser.uid)
        );
        const sessionsSnapshot = await getDocs(sessionsQuery);
        const sessionsData = sessionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSessions(sessionsData);

        // Calculate total earnings
        const totalEarnings = sessionsData.reduce(
          (total, session) => total + (session.earnings || 0),
          0
        );
        setEarnings(totalEarnings);

        // Fetch enrolled students
        const studentsQuery = query(
          collection(db, 'enrollments'),
          where('instructorId', '==', auth.currentUser.uid)
        );
        const studentsSnapshot = await getDocs(studentsQuery);
        const studentsData = studentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };

    fetchInstructorData();
  }, [auth.currentUser, db, navigate]);

  return (
    <motion.div 
      className="instructor-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="dashboard-header">
        <h1>Instructor Dashboard</h1>
        <button 
          className="create-session-btn"
          onClick={() => navigate('/create-session')}
        >
          Create New Session
        </button>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Sessions</h3>
          <p>{sessions.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <p>${earnings.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>
      </div>

      <section className="upcoming-sessions">
        <h2>Upcoming Sessions</h2>
        <div className="sessions-grid">
          {sessions
            .filter(session => new Date(session.date) > new Date())
            .map(session => (
              <div key={session.id} className="session-card">
                <h3>{session.title}</h3>
                <p>{session.description}</p>
                <div className="session-details">
                  <span>Date: {new Date(session.date).toLocaleDateString()}</span>
                  <span>Time: {session.time}</span>
                  <span>Price: ${session.price}</span>
                </div>
                <button 
                  onClick={() => navigate(`/session/${session.id}`)}
                  className="view-session-btn"
                >
                  View Details
                </button>
              </div>
            ))}
        </div>
      </section>

      <section className="enrolled-students">
        <h2>Enrolled Students</h2>
        <div className="students-grid">
          {students.map(student => (
            <div key={student.id} className="student-card">
              <div className="student-info">
                <h3>{student.name}</h3>
                <p>{student.email}</p>
              </div>
              <div className="enrollment-details">
                <span>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                <span>Course: {student.courseName}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default InstructorDashboard;
