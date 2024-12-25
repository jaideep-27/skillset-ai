import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, getDocs, where } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import './Courses.css';

const CourseBrowser = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filters, setFilters] = useState({
    subject: '',
    grade: '',
    priceRange: '',
    sortBy: 'popular'
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const subjects = [
    'Mathematics',
    'Science',
    'English',
    'History',
    'Programming',
    'Physics',
    'Chemistry',
    'Biology'
  ];

  const grades = [
    'Elementary',
    'Middle School',
    'High School',
    'College'
  ];

  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Free', value: 'free' },
    { label: 'Under $20', value: 'under20' },
    { label: '$20 - $50', value: '20-50' },
    { label: 'Over $50', value: 'over50' }
  ];

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [filters, courses]);

  const fetchCourses = async () => {
    try {
      const coursesQuery = query(collection(db, 'courses'));
      const snapshot = await getDocs(coursesQuery);
      const coursesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(coursesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = [...courses];

    // Apply subject filter
    if (filters.subject) {
      filtered = filtered.filter(course => course.subject === filters.subject);
    }

    // Apply grade filter
    if (filters.grade) {
      filtered = filtered.filter(course => course.grade === filters.grade);
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(course => {
        const price = course.price || 0;
        switch (filters.priceRange) {
          case 'free':
            return price === 0;
          case 'under20':
            return price > 0 && price < 20;
          case '20-50':
            return price >= 20 && price <= 50;
          case 'over50':
            return price > 50;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'popular':
          return (b.enrollments || 0) - (a.enrollments || 0);
        case 'priceAsc':
          return (a.price || 0) - (b.price || 0);
        case 'priceDesc':
          return (b.price || 0) - (a.price || 0);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div 
      className="course-browser"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="course-filters">
        <h2>Find Your Perfect Course</h2>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Subject</label>
            <select
              value={filters.subject}
              onChange={(e) => handleFilterChange('subject', e.target.value)}
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Grade Level</label>
            <select
              value={filters.grade}
              onChange={(e) => handleFilterChange('grade', e.target.value)}
            >
              <option value="">All Grades</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="popular">Most Popular</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="courses-grid">
        <AnimatePresence>
          {loading ? (
            <div className="loading-spinner">Loading courses...</div>
          ) : filteredCourses.length === 0 ? (
            <div className="no-courses">
              No courses found matching your criteria
            </div>
          ) : (
            filteredCourses.map(course => (
              <motion.div
                key={course.id}
                className="course-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className="course-image">
                  <img src={course.imageUrl || '/default-course.jpg'} alt={course.title} />
                  {course.price === 0 ? (
                    <span className="course-badge free">Free</span>
                  ) : (
                    <span className="course-badge price">${course.price}</span>
                  )}
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span>{course.subject}</span>
                    <span>{course.grade}</span>
                  </div>
                  <div className="course-stats">
                    <span>{course.enrollments || 0} students</span>
                    <span>{course.rating || 0}/5 rating</span>
                  </div>
                  <div className="course-instructor">
                    <img 
                      src={course.instructorAvatar || '/default-avatar.jpg'} 
                      alt={course.instructorName}
                    />
                    <span>{course.instructorName}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CourseBrowser;
