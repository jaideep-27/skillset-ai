import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetail.css';

// Mock course data
const COURSES_DATA = {
  'web-dev-101': {
    id: 'web-dev-101',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development including HTML, CSS, and JavaScript.',
    instructor: 'John Smith',
    duration: '8 weeks',
    level: 'Beginner',
    price: '$49.99',
    modules: [
      {
        title: 'HTML Basics',
        lessons: [
          { title: 'Introduction to HTML', duration: '30 min' },
          { title: 'HTML Elements & Tags', duration: '45 min' },
          { title: 'Forms and Input Elements', duration: '1 hour' }
        ]
      },
      {
        title: 'CSS Fundamentals',
        lessons: [
          { title: 'CSS Selectors', duration: '45 min' },
          { title: 'Box Model & Layout', duration: '1 hour' },
          { title: 'Flexbox & Grid', duration: '1.5 hours' }
        ]
      }
    ],
    learningObjectives: [
      'Understand HTML structure and semantics',
      'Master CSS styling and layouts',
      'Build responsive web pages',
      'Create interactive user interfaces'
    ],
    requirements: [
      'Basic computer skills',
      'Text editor (VS Code recommended)',
      'Internet connection'
    ]
  },
  'js-advanced': {
    id: 'js-advanced',
    title: 'Advanced JavaScript',
    description: 'Deep dive into advanced JavaScript concepts and modern development practices.',
    instructor: 'Sarah Johnson',
    duration: '10 weeks',
    level: 'Advanced',
    price: '$79.99',
    modules: [
      {
        title: 'ES6+ Features',
        lessons: [
          { title: 'Arrow Functions & Template Literals', duration: '45 min' },
          { title: 'Destructuring & Spread Operator', duration: '1 hour' },
          { title: 'Async/Await & Promises', duration: '1.5 hours' }
        ]
      },
      {
        title: 'Design Patterns',
        lessons: [
          { title: 'Singleton & Factory Patterns', duration: '1 hour' },
          { title: 'Observer Pattern', duration: '45 min' },
          { title: 'Module Pattern & AMD', duration: '1 hour' }
        ]
      }
    ],
    learningObjectives: [
      'Master modern JavaScript features',
      'Implement common design patterns',
      'Write clean, maintainable code',
      'Build scalable applications'
    ],
    requirements: [
      'Intermediate JavaScript knowledge',
      'Understanding of ES6 basics',
      'Experience with web development'
    ]
  }
};

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with setTimeout
    setTimeout(() => {
      const courseData = COURSES_DATA[id];
      setCourse(courseData || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!course) {
    return <div className="error">Course not found</div>;
  }

  return (
    <div className="course-detail">
      <div className="course-header">
        <h1>{course.title}</h1>
        <p className="course-description">{course.description}</p>
        <div className="course-meta">
          <span className="instructor">By {course.instructor}</span>
          <span className="duration">{course.duration}</span>
          <span className="level">{course.level}</span>
        </div>
      </div>

      <div className="course-content">
        <h2>Course Content</h2>
        <div className="modules">
          {course.modules.map((module, index) => (
            <div key={index} className="module">
              <h3>{module.title}</h3>
              <ul>
                {module.lessons.map((lesson, lessonIndex) => (
                  <li key={lessonIndex}>
                    <span className="lesson-title">{lesson.title}</span>
                    <span className="lesson-duration">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="course-features">
        <h2>What You'll Learn</h2>
        <ul>
          {course.learningObjectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </div>

      <div className="course-requirements">
        <h2>Requirements</h2>
        <ul>
          {course.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>

      <div className="enroll-section">
        <button className="enroll-button">Enroll Now</button>
        <div className="price">{course.price}</div>
      </div>
    </div>
  );
};

export default CourseDetail;
