import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getLearningPath = async (subject) => {
    try {
        const response = await api.post('/api/learning-path', { subject });
        return response.data;
    } catch (error) {
        console.error('Error fetching learning path:', error);
        throw error;
    }
};

export const getAllLearningPaths = async () => {
    try {
        const response = await api.get('/api/learning-paths');
        return response.data;
    } catch (error) {
        console.error('Error fetching learning paths:', error);
        throw error;
    }
};

export const getLearningPathBySubject = async (subject) => {
    try {
        const response = await api.get(`/api/learning-path/${subject}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching learning path:', error);
        throw error;
    }
};

export default api;
