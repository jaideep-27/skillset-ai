import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AITutorsProgress from '../../components/dashboard/AITutorsProgress';
import './Dashboard.css';

const data = [
  { name: 'Week 1', progress: 65 },
  { name: 'Week 2', progress: 78 },
  { name: 'Week 3', progress: 82 },
  { name: 'Week 4', progress: 95 },
];

const courses = [
  {
    icon: '🧠',
    title: 'Learn the basics of artificial intelligence',
    description: 'Master foundational AI concepts'
  },
  {
    icon: '💻',
    title: 'Master Python fundamentals',
    description: 'Complete Python programming basics'
  },
  {
    icon: '🏆',
    title: 'Completed 5 lessons in one day',
    description: 'Showing dedication to learning'
  },
  {
    icon: '👥',
    title: 'Join the conversation on AI Ethics',
    description: 'Participate in community discussions'
  }
];

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, Joe!</h1>
        <p>Track your progress and continue learning</p>
      </div>

      <div className="dashboard-grid">
        <AITutorsProgress />
        
        <div className="progress-card">
          <h2>Learning Progress</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                width={35}
              />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="#4C6FFF"
                strokeWidth={2}
                dot={{ fill: '#4C6FFF', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="course-cards">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <div className="course-icon">
                <span role="img" aria-label="course">{course.icon}</span>
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
