import React, { useState } from 'react';
import './Courses.css';

// Import course icons
import introProgrammingIcon from '../../assets/course-icons/intro-programming.svg';
import webDevIcon from '../../assets/course-icons/web-dev.svg';
import uiuxDesignIcon from '../../assets/course-icons/uiux-design.svg';
import dataScienceIcon from '../../assets/course-icons/data-science.svg';
import mobileDevIcon from '../../assets/course-icons/mobile-dev.svg';
import digitalMarketingIcon from '../../assets/course-icons/digital-marketing.svg';

const LevelIcon = ({ level }) => {
  switch (level) {
    case 'Beginner':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19h20L12 2zm0 3.8L18.5 17H5.5L12 5.8z"/>
        </svg>
      );
    case 'Intermediate':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19h20L12 2zm0 3.8L18.5 17H5.5L12 5.8zm0 4.2l4.5 8H7.5l4.5-8z"/>
        </svg>
      );
    case 'Advanced':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19h20L12 2zm0 3.8L18.5 17H5.5L12 5.8zm0 4.2l4.5 8H7.5l4.5-8zm0 4l2.5 4h-5l2.5-4z"/>
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19h20L12 2zm0 3.8L18.5 17H5.5L12 5.8z"/>
          <circle cx="12" cy="14" r="3"/>
        </svg>
      );
  }
};

const courses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the fundamentals of programming with Python. Perfect for beginners starting their coding journey.',
    duration: '8 weeks',
    level: 'Beginner',
    students: 156,
    rating: '4.8/5',
    price: 'Free',
    image: introProgrammingIcon
  },
  {
    id: 2,
    title: 'Web Development Bootcamp',
    description: 'Master HTML, CSS, JavaScript, and modern frameworks. Build real-world projects and launch your web dev career.',
    duration: '12 weeks',
    level: 'Intermediate',
    students: 234,
    rating: '4.9/5',
    price: '$79.99',
    image: webDevIcon
  },
  {
    id: 3,
    title: 'UI/UX Design Essentials',
    description: 'Learn to create beautiful and functional user interfaces. Master design principles and industry-standard tools.',
    duration: '10 weeks',
    level: 'All Levels',
    students: 189,
    rating: '4.7/5',
    price: '$89.99',
    image: uiuxDesignIcon
  },
  {
    id: 4,
    title: 'Data Science Fundamentals',
    description: 'Dive into data analysis, machine learning, and statistics. Learn Python, Pandas, and NumPy.',
    duration: '14 weeks',
    level: 'Intermediate',
    students: 145,
    rating: '4.8/5',
    price: '$99.99',
    image: dataScienceIcon
  },
  {
    id: 5,
    title: 'Mobile App Development',
    description: 'Build iOS and Android apps with React Native. Learn once, deploy everywhere.',
    duration: '16 weeks',
    level: 'Advanced',
    students: 167,
    rating: '4.9/5',
    price: '$109.99',
    image: mobileDevIcon
  },
  {
    id: 6,
    title: 'Digital Marketing',
    description: 'Master SEO, social media, and content marketing. Grow your online presence effectively.',
    duration: '8 weeks',
    level: 'Beginner',
    students: 213,
    rating: '4.6/5',
    price: '$69.99',
    image: digitalMarketingIcon
  }
];

function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="courses">
      <div className="courses-header">
        <h1>Available Courses</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search courses..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearch}
          />
          <select
            className="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All Categories">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Web Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-content">
              <div className="course-icon">
                <img src={course.image} alt="" aria-hidden="true" />
              </div>
              <h2 className="course-title">{course.title}</h2>
              <p className="course-description">{course.description}</p>
              
              <div className="duration">
                <span className="duration-icon">⏱️</span>
                {course.duration}
              </div>

              <div className="course-meta">
                <div className="meta-item">
                  <div className="meta-value">{course.students}</div>
                  <div className="meta-label">Students</div>
                </div>
                <div className="meta-item">
                  <div className="meta-value">{course.rating}</div>
                  <div className="meta-label">Rating</div>
                </div>
              </div>

              <div className="course-footer">
                <span className={`course-price ${course.price === 'Free' ? 'free' : ''}`}>
                  {course.price}
                </span>
                <span className={`course-level ${course.level.split(' ')[0]}`}>
                  <LevelIcon level={course.level} />
                  {course.level}
                </span>
              </div>

              <button className="enroll-button">Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
