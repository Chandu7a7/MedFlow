import express from 'express';
import { analyzeSymptoms } from '../controllers/symptomCheckerController.js';

const symptomCheckerRouter = express.Router();

symptomCheckerRouter.post('/', analyzeSymptoms);

export default symptomCheckerRouter;
