
import { GoogleGenAI } from "@google/genai";

// Initialize with API key
const apiKey = (import.meta.env.VITE_GEMINI_API_KEY as string) || "";

if (!apiKey) {
  console.error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
  throw new Error("Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.");
}

const ai = new GoogleGenAI({ apiKey });

export const geminiService = {
  generatePythonCode: async (datasetName: string, goal: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: `You are a Senior Data Scientist. Write a clean, commented Python script for a Kaggle dataset named "${datasetName}". The goal is "${goal}". Use libraries like pandas, matplotlib, and sklearn. Explain what the code does briefly at the end.`,
        config: {
          temperature: 0.3,
          topP: 0.9,
        }
      });
      return response.text || "Could not generate code.";
    } catch (error: any) {
      console.error("Gemini Python Gen Error:", error);
      throw new Error(`Failed to generate code. ${error.message || 'The API might be experiencing issues. Please try again.'}`);
    }
  },

  generateSummary: async (content: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: `Summarize the following educational content in a concise, bulleted format suitable for exam revision: \n\n ${content}`,
        config: {
          temperature: 0.5,
          topP: 0.9,
        }
      });
      return response.text || "Could not generate summary.";
    } catch (error: any) {
      console.error("Gemini Summary Error:", error);
      throw new Error(`Failed to generate summary. ${error.message || 'The API might be experiencing issues. Please try again.'}`);
    }
  },

  generateFlashcards: async (content: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: `Create a set of 5-10 flashcards (Question and Answer pairs) based on the following text. Return them in a valid JSON format. \n\n ${content}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "array" as const,
            items: {
              type: "object" as const,
              properties: {
                question: { type: "string" as const },
                answer: { type: "string" as const }
              },
              required: ["question", "answer"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error: any) {
      console.error("Gemini Flashcards Error:", error);
      throw new Error(`Failed to generate flashcards. ${error.message || 'The API might be experiencing issues. Please try again.'}`);
    }
  },

  generatePracticeQuestions: async (content: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: `Generate 5 multiple-choice questions based on this text for exam practice. Include options and the correct answer. \n\n ${content}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "array" as const,
            items: {
              type: "object" as const,
              properties: {
                question: { type: "string" as const },
                options: { type: "array" as const, items: { type: "string" as const } },
                correctAnswer: { type: "string" as const }
              },
              required: ["question", "options", "correctAnswer"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error: any) {
      console.error("Gemini Practice Questions Error:", error);
      throw new Error(`Failed to generate questions. ${error.message || 'The API might be experiencing issues. Please try again.'}`);
    }
  }
};
