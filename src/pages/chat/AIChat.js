import React, { useState, useRef, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import './Chat.css';

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const messagesEndRef = useRef(null);
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

  useEffect(() => {
    loadChatHistory();
    scrollToBottom();
  }, []);

  const loadChatHistory = async () => {
    try {
      const chatQuery = query(
        collection(db, 'chats'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'asc')
      );
      const snapshot = await getDocs(chatQuery);
      const chatHistory = snapshot.docs.map(doc => doc.data());
      setMessages(chatHistory);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage) => {
    // Simulate AI thinking time
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real implementation, this would call your AI service
    // For now, we'll simulate responses based on keywords
    let aiResponse = '';
    const lowercaseMessage = userMessage.toLowerCase();

    if (lowercaseMessage.includes('explain')) {
      aiResponse = "Let me break this down step by step...";
    } else if (lowercaseMessage.includes('example')) {
      aiResponse = "Here's a practical example to help you understand...";
    } else if (lowercaseMessage.includes('practice')) {
      aiResponse = "I'll create some practice problems for you...";
    } else {
      aiResponse = "I'm here to help! Could you be more specific about what you'd like to learn?";
    }

    setIsTyping(false);
    return aiResponse;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
      subject: selectedSubject
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Generate and add AI response
    const aiResponse = await generateAIResponse(input);
    const aiMessage = {
      text: aiResponse,
      sender: 'ai',
      timestamp: new Date().toISOString(),
      subject: selectedSubject
    };

    setMessages(prev => [...prev, aiMessage]);

    // Store conversation in Firebase
    try {
      await addDoc(collection(db, 'chats'), {
        ...userMessage,
        userId: auth.currentUser.uid
      });
      await addDoc(collection(db, 'chats'), {
        ...aiMessage,
        userId: auth.currentUser.uid
      });
    } catch (error) {
      console.error('Error storing chat:', error);
    }
  };

  return (
    <motion.div 
      className="ai-chat-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="chat-container">
        <div className="chat-header">
          <h1>AI Learning Assistant</h1>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="subject-select"
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div className="messages-container">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`message ${message.sender}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="message-content">
                  <p>{message.text}</p>
                  {message.subject && (
                    <span className="message-subject">{message.subject}</span>
                  )}
                </div>
                <span className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                className="message ai typing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your studies..."
            disabled={!selectedSubject}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || !selectedSubject}
          >
            Send
          </button>
        </form>

        <div className="chat-features">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button onClick={() => setInput('Can you explain this concept?')}>
              Ask for Explanation
            </button>
            <button onClick={() => setInput('Can you give me an example?')}>
              Request Example
            </button>
            <button onClick={() => setInput('I need practice problems')}>
              Get Practice Problems
            </button>
            <button onClick={() => setInput('How do I solve this?')}>
              Ask for Solution
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIChat;
