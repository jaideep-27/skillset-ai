import React from 'react';
import './Community.css';

function Community() {
  return (
    <div className="community">
      <div className="community-container">
        <h1>Community</h1>
        
        <div className="community-sections">
          <div className="forums-section">
            <h2>Discussion Forums</h2>
            <div className="forum-topics">
              <div className="topic-card">
                <h3>Programming Help</h3>
                <p>Get help with coding problems</p>
                <span className="topic-stats">1.2k members • 50 online</span>
              </div>
              
              <div className="topic-card">
                <h3>Project Collaboration</h3>
                <p>Find partners for your projects</p>
                <span className="topic-stats">856 members • 32 online</span>
              </div>
              
              <div className="topic-card">
                <h3>Career Advice</h3>
                <p>Share and get career guidance</p>
                <span className="topic-stats">2.1k members • 128 online</span>
              </div>
            </div>
          </div>

          <div className="events-section">
            <h2>Upcoming Events</h2>
            <div className="events-list">
              <div className="event-card">
                <div className="event-date">
                  <span className="date">25</span>
                  <span className="month">Dec</span>
                </div>
                <div className="event-details">
                  <h3>Web Development Workshop</h3>
                  <p>Learn modern web development practices</p>
                  <span className="event-time">2:00 PM - 4:00 PM</span>
                </div>
              </div>

              <div className="event-card">
                <div className="event-date">
                  <span className="date">28</span>
                  <span className="month">Dec</span>
                </div>
                <div className="event-details">
                  <h3>AI in Practice</h3>
                  <p>Practical applications of AI</p>
                  <span className="event-time">6:00 PM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
