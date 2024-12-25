import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const mockCourses = [
  {
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with Python',
    duration: '8 weeks',
    level: 'Beginner',
    category: 'programming',
    price: 0,
    enrollments: 156,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    instructorName: 'John Doe',
    instructorId: 'instructor1',
    syllabus: [
      {
        title: 'Getting Started',
        duration: '1 week',
        lessons: [
          { title: 'Introduction to Python', duration: '45 min' },
          { title: 'Setting Up Your Environment', duration: '30 min' }
        ]
      }
    ]
  },
  {
    title: 'Web Development',
    description: 'Master HTML, CSS, and JavaScript',
    duration: '12 weeks',
    level: 'Intermediate',
    category: 'programming',
    price: 49.99,
    enrollments: 234,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
    instructorName: 'Jane Smith',
    instructorId: 'instructor2',
    syllabus: [
      {
        title: 'HTML & CSS Basics',
        duration: '2 weeks',
        lessons: [
          { title: 'HTML Structure', duration: '1 hour' },
          { title: 'CSS Styling', duration: '1 hour' }
        ]
      }
    ]
  },
  {
    title: 'UI/UX Design',
    description: 'Create beautiful and functional interfaces',
    duration: '10 weeks',
    level: 'All Levels',
    category: 'design',
    price: 79.99,
    enrollments: 189,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    instructorName: 'Sarah Johnson',
    instructorId: 'instructor3',
    syllabus: [
      {
        title: 'Design Principles',
        duration: '2 weeks',
        lessons: [
          { title: 'Color Theory', duration: '45 min' },
          { title: 'Typography', duration: '45 min' }
        ]
      }
    ]
  }
];

export const seedCourses = async () => {
  try {
    const coursesRef = collection(db, 'courses');
    
    for (const course of mockCourses) {
      await addDoc(coursesRef, {
        ...course,
        createdAt: new Date().toISOString()
      });
    }
    
    console.log('Successfully seeded courses');
  } catch (error) {
    console.error('Error seeding courses:', error);
  }
};

// Uncomment to seed courses
// seedCourses();
