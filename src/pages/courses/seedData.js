import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const mockCourses = [
  {
    title: 'Introduction to Programming',
    description: 'Learn the fundamentals of programming with Python. Perfect for beginners starting their coding journey.',
    duration: '8 weeks',
    level: 'Beginner',
    category: 'programming',
    price: 0,
    enrollments: 156,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
    createdAt: new Date().toISOString()
  },
  {
    title: 'Web Development Bootcamp',
    description: 'Master HTML, CSS, JavaScript, and modern frameworks. Build real-world projects and launch your web dev career.',
    duration: '12 weeks',
    level: 'Intermediate',
    category: 'programming',
    price: 49.99,
    enrollments: 234,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613',
    createdAt: new Date().toISOString()
  },
  {
    title: 'UI/UX Design Essentials',
    description: 'Learn to create beautiful and functional user interfaces. Master design principles and industry-standard tools.',
    duration: '10 weeks',
    level: 'All Levels',
    category: 'design',
    price: 79.99,
    enrollments: 189,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    createdAt: new Date().toISOString()
  },
  {
    title: 'Data Science Fundamentals',
    description: 'Dive into data analysis, machine learning, and statistics. Learn Python, Pandas, and NumPy.',
    duration: '14 weeks',
    level: 'Intermediate',
    category: 'science',
    price: 89.99,
    enrollments: 145,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    createdAt: new Date().toISOString()
  },
  {
    title: 'Mobile App Development',
    description: 'Build iOS and Android apps with React Native. Learn once, deploy everywhere.',
    duration: '16 weeks',
    level: 'Advanced',
    category: 'programming',
    price: 99.99,
    enrollments: 167,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    createdAt: new Date().toISOString()
  },
  {
    title: 'Digital Marketing',
    description: 'Master SEO, social media, and content marketing. Grow your online presence effectively.',
    duration: '8 weeks',
    level: 'Beginner',
    category: 'business',
    price: 49.99,
    enrollments: 213,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
    createdAt: new Date().toISOString()
  }
];

export const seedCourses = async () => {
  try {
    const coursesRef = collection(db, 'courses');
    
    for (const course of mockCourses) {
      await addDoc(coursesRef, course);
      console.log(`Added course: ${course.title}`);
    }
    
    console.log('Successfully seeded all courses!');
  } catch (error) {
    console.error('Error seeding courses:', error);
  }
};

// Run this function to seed the database
seedCourses();
