import { storeAssessmentData } from '../../services/languageModel';

// Learning path templates for each learning style
const learningPathTemplates = {
  visual: {
    steps: [
      "Visual Concept Mapping",
      "Diagram-Based Learning",
      "Video Tutorials",
      "Infographic Study Materials",
      "Visual Problem Solving"
    ]
  },
  auditory: {
    steps: [
      "Audio Lectures",
      "Group Discussions",
      "Verbal Problem Solving",
      "Audio Study Materials",
      "Interactive Dialogues"
    ]
  },
  kinesthetic: {
    steps: [
      "Hands-on Exercises",
      "Interactive Projects",
      "Physical Demonstrations",
      "Practice-based Learning",
      "Real-world Applications"
    ]
  }
};

// Process assessment answers and generate a learning path
export const processAssessmentResults = async (answers, tutorStyle, accessibility) => {
  try {
    console.log('Processing assessment with:', { answers, tutorStyle, accessibility });

    // Store assessment data for training
    await storeAssessmentData(tutorStyle, answers);

    // Calculate assessment scores
    const scores = Object.values(answers).reduce((acc, answer) => {
      console.log('Processing answer:', answer);
      return acc + (answer.score || 1);
    }, 0);

    console.log('Calculated total score:', scores);

    // Get learning path template based on tutor style
    const template = learningPathTemplates[tutorStyle.toLowerCase()];
    if (!template) {
      console.error('Invalid tutor style:', tutorStyle);
      throw new Error(`Invalid tutor style: ${tutorStyle}`);
    }

    console.log('Using template:', template);

    // Generate personalized learning path
    const learningPath = template.steps.map((step, index) => {
      return {
        id: index + 1,
        title: step,
        description: `Step ${index + 1}: ${step}`,
        completed: false
      };
    });

    console.log('Generated learning path:', learningPath);

    return {
      learningPath,
      totalScore: scores,
      recommendedPath: learningPath.map(step => step.title)
    };
  } catch (error) {
    console.error('Failed to process assessment:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      answers,
      tutorStyle,
      accessibility
    });
    throw error;
  }
};

// Generate additional learning path details
export const generateLearningPath = async (results, tutorStyle, userSettings) => {
  try {
    return {
      path: results.recommendedPath,
      style: tutorStyle,
      accessibility: userSettings.accessibility
    };
  } catch (error) {
    console.error('Failed to generate learning path:', error);
    throw error;
  }
};