/**
 * Symptom-to-specialization mapping engine.
 * Keys match exact `speciality` values stored in doctorModel.
 */

const SPECIALIZATION_MAPPING = {
  'General physician': [
    'chest pain',
    'palpitations',
    'breathlessness',
    'shortness of breath',
    'breathing issues',
    'fever',
    'cough',
    'cold',
    'fatigue',
    'weakness',
    'body ache',
    'sore throat',
    'flu',
    'infection',
    'high blood pressure',
    'diabetes',
    'general checkup',
  ],
  Dermatologist: [
    'rash',
    'acne',
    'itching',
    'skin',
    'eczema',
    'psoriasis',
    'hives',
    'dry skin',
    'skin allergy',
    'hair loss',
    'dandruff',
    'pimple',
    'blister',
  ],
  Neurologist: [
    'headache',
    'dizziness',
    'migraine',
    'seizure',
    'numbness',
    'tingling',
    'memory loss',
    'tremor',
    'paralysis',
    'confusion',
    'fainting',
    'vertigo',
  ],
  Gastroenterologist: [
    'stomach pain',
    'nausea',
    'vomiting',
    'diarrhea',
    'constipation',
    'acid reflux',
    'bloating',
    'indigestion',
    'abdominal pain',
    'heartburn',
    'gas',
    'ulcer',
  ],
  Gynecologist: [
    'period pain',
    'menstrual',
    'pregnancy',
    'vaginal',
    'irregular periods',
    'pcos',
    'menopause',
    'pelvic pain',
    'fertility',
    'breast pain',
  ],
  Pediatricians: [
    'child fever',
    'infant',
    'baby',
    'child cough',
    'child rash',
    'vaccination',
    'growth issue',
    'child vomiting',
  ],
};

const ALL_KNOWN_SYMPTOMS = [
  ...new Set(Object.values(SPECIALIZATION_MAPPING).flat()),
];

const FALLBACK_SPECIALIZATION = 'General physician';
const MIN_STRONG_SCORE = 1;
const TOP_RESULTS = 3;

const normalizeText = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, ' ');

/**
 * Rule-based symptom extraction from raw user text (AI fallback).
 */
const extractSymptomsFromText = (text) => {
  const normalized = normalizeText(text);
  const matched = ALL_KNOWN_SYMPTOMS.filter((symptom) =>
    normalized.includes(symptom)
  );

  return [...new Set(matched)];
};

/**
 * Score each specialization by counting matched symptoms.
 */
const mapSymptomsToSpecializations = (symptoms) => {
  const normalizedSymptoms = symptoms.map(normalizeText);
  const scores = {};

  for (const [specialization, keywords] of Object.entries(
    SPECIALIZATION_MAPPING
  )) {
    scores[specialization] = 0;

    for (const keyword of keywords) {
      const normalizedKeyword = normalizeText(keyword);

      for (const symptom of normalizedSymptoms) {
        if (
          symptom.includes(normalizedKeyword) ||
          normalizedKeyword.includes(symptom)
        ) {
          scores[specialization]++;
          break;
        }
      }
    }
  }

  const ranked = Object.entries(scores)
    .map(([name, score]) => ({ name, score }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const maxScore = ranked[0]?.score ?? 0;

  if (maxScore < MIN_STRONG_SCORE) {
    return [{ name: FALLBACK_SPECIALIZATION, score: 0 }];
  }

  return ranked.slice(0, TOP_RESULTS);
};

export {
  extractSymptomsFromText,
  mapSymptomsToSpecializations,
  FALLBACK_SPECIALIZATION,
};
