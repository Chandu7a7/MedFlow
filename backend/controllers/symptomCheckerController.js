import doctorModel from '../models/doctorModel.js';
import { extractSymptomsWithGemini, MAX_INPUT_LENGTH } from '../services/geminiService.js';
import {
  extractSymptomsFromText,
  mapSymptomsToSpecializations,
} from '../services/symptomMappingService.js';

const DISCLAIMER =
  'This tool suggests relevant doctor specializations only. It does not provide medical diagnosis or treatment advice. Please consult a qualified healthcare professional.';

const analyzeSymptoms = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide symptom text in the "text" field.',
      });
    }

    const trimmedText = text.trim();

    if (trimmedText.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Please describe your symptoms in at least 3 characters.',
      });
    }

    if (trimmedText.length > MAX_INPUT_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Symptom description must be under ${MAX_INPUT_LENGTH} characters.`,
      });
    }

    let symptoms = [];
    let extractionSource = 'gemini';

    try {
      symptoms = await extractSymptomsWithGemini(trimmedText);
    } catch (aiError) {
      console.warn('Gemini extraction failed, using rule-based fallback:', aiError.message);
      extractionSource = 'rule-based';
      symptoms = extractSymptomsFromText(trimmedText);
    }

    if (symptoms.length === 0) {
      extractionSource = 'rule-based';
      symptoms = extractSymptomsFromText(trimmedText);
    }

    const specializations = mapSymptomsToSpecializations(symptoms);
    const specializationNames = specializations.map((item) => item.name);

    const doctors = await doctorModel
      .find({
        speciality: { $in: specializationNames },
        isVerified: true,
        status: 'approved',
        available: true,
      })
      .select('-password -email')
      .sort({ name: 1 });

    res.json({
      success: true,
      symptoms,
      specializations,
      doctors,
      extractionSource,
      disclaimer: DISCLAIMER,
    });
  } catch (error) {
    console.error('Symptom checker error:', error);
    res.status(500).json({
      success: false,
      message: 'Unable to process symptoms. Please try again.',
    });
  }
};

export { analyzeSymptoms };
