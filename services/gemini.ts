
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with API key
// In production (Vercel), use GEMINI_API_KEY
// In development (local), use VITE_GEMINI_API_KEY
const apiKey = (import.meta.env.GEMINI_API_KEY as string) ||
  (import.meta.env.VITE_GEMINI_API_KEY as string) || "";

if (!apiKey) {
  console.error("Gemini API key is not configured. Please add GEMINI_API_KEY (Vercel) or VITE_GEMINI_API_KEY (local) to your environment variables.");
  throw new Error("Gemini API key is not configured.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiService = {
  generatePythonCode: async (datasetName: string, goal: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `You are a Senior Data Scientist. Write a clean, commented Python script for a Kaggle dataset named "${datasetName}". The goal is "${goal}". Use libraries like pandas, matplotlib, and sklearn. Explain what the code does briefly at the end.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text() || "Could not generate code.";
    } catch (error: any) {
      console.error("Gemini Python Gen Error:", error);
      throw new Error(`Failed to generate code. ${error.message || 'The API might be experiencing issues. Please try again.'}`);
    }
  },

  generateSummary: async (content: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `Summarize the following educational content in a concise, bulleted format suitable for exam revision:\n\n${content}`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      return response.text() || "Could not generate summary.";
    } catch (error: any) {
      console.error("Gemini Summary Error:", error);
      throw new Error(`Failed to generate summary. ${error.message || 'The API might be experiencing issues. Please try again.'}`);
    }
  },

  generateFlashcards: async (content: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `Create a set of 5-10 flashcards (Question and Answer pairs) based on the following text. Return ONLY a valid JSON array in this exact format: [{"question": "...", "answer": "..."}]\n\nText:\n${content}`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      try {
        // Try to extract JSON from the response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        return [];
      } catch {
        console.warn("Failed to parse flashcards JSON, returning empty array");
        return [];
      }
    } catch (error: any) {
      console.error("Gemini Flashcards Error:", error);
      throw new Error(`Failed to generate flashcards. ${error.message || 'The API might be experiencing issues. Please try again.'}`);
    }
  },

  generatePracticeQuestions: async (content: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `Generate 5 multiple-choice questions based on this text for exam practice. Return ONLY a valid JSON array in this exact format: [{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": "A"}]\n\nText:\n${content}`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      try {
        // Try to extract JSON from the response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        return [];
      } catch {
        console.warn("Failed to parse questions JSON, returning empty array");
        return [];
      }
    } catch (error: any) {
      console.error("Gemini Practice Questions Error:", error);
      throw new Error(`Failed to generate questions. ${error.message || 'The API might be experiencing issues. Please try again.'}`);
    }
  }
};
