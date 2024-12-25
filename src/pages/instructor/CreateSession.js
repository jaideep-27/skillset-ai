import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import './Instructor.css';

const CreateSession = () => {
  const [sessionData, setSessionData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    price: '',
    maxStudents: '',
    subject: '',
    grade: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSessionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const sessionRef = await addDoc(collection(db, 'sessions'), {
        ...sessionData,
        instructorId: auth.currentUser.uid,
        instructorName: auth.currentUser.displayName,
        createdAt: new Date().toISOString(),
        enrolledStudents: 0,
        status: 'upcoming'
      });

      navigate(`/session/${sessionRef.id}`);
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="create-session-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="create-session-container">
        <h1>Create New Session</h1>
        <form onSubmit={handleSubmit} className="session-form">
          <div className="form-group">
            <label htmlFor="title">Session Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={sessionData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter session title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={sessionData.description}
              onChange={handleInputChange}
              required
              placeholder="Describe your session"
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={sessionData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={sessionData.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={sessionData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxStudents">Max Students</label>
              <input
                type="number"
                id="maxStudents"
                name="maxStudents"
                value={sessionData.maxStudents}
                onChange={handleInputChange}
                required
                min="1"
                placeholder="10"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={sessionData.subject}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Subject</option>
                <option value="mathematics">Mathematics</option>
                <option value="science">Science</option>
                <option value="english">English</option>
                <option value="history">History</option>
                <option value="programming">Programming</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="grade">Grade Level</label>
              <select
                id="grade"
                name="grade"
                value={sessionData.grade}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Grade</option>
                <option value="elementary">Elementary</option>
                <option value="middle">Middle School</option>
                <option value="high">High School</option>
                <option value="college">College</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/instructor-dashboard')}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Session'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateSession;
