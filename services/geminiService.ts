// Implementing the Gemini Service to fetch trivia questions.
import { GoogleGenAI, Type } from '@google/genai';
import { Question } from '../types';
import { TOTAL_QUESTIONS } from '../constants';

// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getTriviaQuestions = async (category: string, difficulty: string): Promise<Question[]> => {
  const model = 'gemini-2.5-flash';
  
  const prompt = `Generate ${TOTAL_QUESTIONS} trivia questions for the category "${category}" with difficulty level "${difficulty}".
  Each question should have 4 multiple choice options and one correct answer.
  The answer must be one of the options.`;

  // Define the expected JSON schema for the response.
  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        question: {
          type: Type.STRING,
          description: 'The trivia question.',
        },
        options: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
          description: 'An array of 4 multiple choice options.',
        },
        answer: {
          type: Type.STRING,
          description: 'The correct answer, which must be one of the provided options.',
        },
      },
      required: ['question', 'options', 'answer'],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText);
    
    // Basic validation to ensure the API returned a valid format.
    if (!Array.isArray(questions) || questions.length === 0 || !questions[0].question) {
        throw new Error('Invalid question format received from API.');
    }

    return questions as Question[];
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw new Error('Failed to generate trivia questions. Please try again.');
  }
};
