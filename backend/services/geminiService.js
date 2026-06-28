import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL_NAME = 'gemini-1.5-flash';
const MAX_INPUT_LENGTH = 500;

const buildPrompt = (text) =>
  `You are a medical symptom extraction assistant for a healthcare appointment platform.

IMPORTANT RULES:
- Extract ONLY medical symptoms from the user's text.
- DO NOT provide any diagnosis, medical advice, or treatment suggestions.
- Return symptoms as a lowercase JSON array of strings.
- Normalize synonyms (e.g., "breathing issues" -> "breathlessness", "shortness of breath" -> "breathlessness").
- If no clear symptoms are found, return an empty array.

Respond with ONLY valid JSON in this exact format:
{"symptoms": ["symptom1", "symptom2"]}

User input: "${text.replace(/"/g, '\\"')}"`;

const parseGeminiResponse = (rawText) => {
  const cleaned = rawText
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed.symptoms)) {
    throw new Error('Invalid Gemini response format');
  }

  return parsed.symptoms
    .filter((item) => typeof item === 'string')
    .map((item) => item.toLowerCase().trim())
    .filter(Boolean);
};

/**
 * Extract structured symptoms from natural language using Gemini 1.5 Flash.
 */
const extractSymptomsWithGemini = async (text) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  if (text.length > MAX_INPUT_LENGTH) {
    throw new Error(`Input exceeds maximum length of ${MAX_INPUT_LENGTH} characters`);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
    },
  });

  const result = await model.generateContent(buildPrompt(text));
  const responseText = result.response.text();

  if (!responseText) {
    throw new Error('Empty response from Gemini');
  }

  return parseGeminiResponse(responseText);
};

export { extractSymptomsWithGemini, MAX_INPUT_LENGTH };
