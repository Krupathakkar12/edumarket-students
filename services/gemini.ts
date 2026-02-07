
import { GoogleGenAI, Type } from "@google/genai";

// Lazy initialization: only create the AI instance when actually needed
let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || "";
    if (!apiKey) {
      throw new Error("Gemini API key is not configured. Please set GEMINI_API_KEY in your environment variables.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};


export const geminiService = {
  generatePythonCode: async (datasetName: string, goal: string) => {
    try {
      const response = await getAI().models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a Senior Data Scientist. Write a clean, commented Python script for a Kaggle dataset named "${datasetName}". The goal is "${goal}". Use libraries like pandas, matplotlib, and sklearn. Explain what the code does briefly at the end.`,
        config: {
          temperature: 0.3,
          topP: 0.9,
        }
      });
      return response.text || "Could not generate code.";
    } catch (error) {
      console.error("Gemini Python Gen Error:", error);
      return "An error occurred while generating Python code.";
    }
  },

  generateSummary: async (content: string) => {
    try {
      const response = await getAI().models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize the following educational content in a concise, bulleted format suitable for exam revision: \n\n ${content}`,
        config: {
          temperature: 0.5,
          topP: 0.9,
        }
      });
      return response.text || "Could not generate summary.";
    } catch (error) {
      console.error("Gemini Summary Error:", error);
      return "An error occurred while generating the summary.";
    }
  },

  generateFlashcards: async (content: string) => {
    try {
      const response = await getAI().models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a set of 5-10 flashcards (Question and Answer pairs) based on the following text. Return them in a valid JSON format. \n\n ${content}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                answer: { type: Type.STRING }
              },
              required: ["question", "answer"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Gemini Flashcards Error:", error);
      return [];
    }
  },

  generatePracticeQuestions: async (content: string) => {
    try {
      const response = await getAI().models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 5 multiple-choice questions based on this text for exam practice. Include options and the correct answer. \n\n ${content}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.STRING }
              },
              required: ["question", "options", "correctAnswer"]
            }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Gemini Practice Questions Error:", error);
      return [];
    }
  }
};
