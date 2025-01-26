import OpenAI from 'openai';
import axios from 'axios';

const API_KEY = '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';
const API_BASE_URL = 'http://localhost:3001/api';

const openai = new OpenAI({
  apiKey: API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
  dangerouslyAllowBrowser: true
});

// Helper function to format messages based on tutor type
const formatTutorMessage = (tutorType, question) => {
  const tutorPersonas = {
    visual: "You are a visual learning tutor who explains concepts using imagery, diagrams, and visual metaphors. Focus on visual explanations.",
    auditory: "You are an auditory learning tutor who explains concepts through verbal descriptions and sound-based analogies. Focus on clear verbal explanations.",
    kinesthetic: "You are a kinesthetic learning tutor who explains concepts through practical, hands-on examples and physical analogies. Focus on learning by doing."
  };

  return [
    { 
      role: "system", 
      content: tutorPersonas[tutorType.toLowerCase()] || tutorPersonas.visual
    },
    {
      role: "user",
      content: question
    }
  ];
};

// Store assessment answers for model training
export const storeAssessmentData = async (tutorType, answers) => {
  try {
    // Format answers to match backend expectations
    const formattedAnswers = {};
    Object.entries(answers).forEach(([question, data]) => {
      formattedAnswers[question] = typeof data === 'object' ? data.answer : data;
    });

    const response = await axios.post(`${API_BASE_URL}/assessment/store`, {
      tutorType,
      answers: formattedAnswers
    });

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to process assessment');
    }

    return response.data;
  } catch (error) {
    console.error('Failed to store assessment data:', error);
    throw new Error('Failed to process assessment results. Please try again.');
  }
};

// Get AI tutor response based on user question
export const getAITutorResponse = async (tutorType, question) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tutor/chat`, {
      tutorType,
      question
    });

    if (!response.data) {
      throw new Error('No response received from tutor');
    }

    return response.data.response;
  } catch (error) {
    console.error('Failed to get AI tutor response:', error);
    throw error;
  }
};

// Train model with new data (Note: This is a placeholder as training would typically be done server-side)
export const trainModel = async (tutorType, trainingData) => {
  try {
    console.log(`Training model for ${tutorType} with data:`, trainingData);
    return {
      success: true,
      message: 'Model training request received. Training will be processed on the server.'
    };
  } catch (error) {
    console.error('Failed to train model:', error);
    throw error;
  }
};
