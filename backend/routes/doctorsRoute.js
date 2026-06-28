import express from 'express';
import { registerDoctor, loginDoctor } from '../controllers/doctorController.js';
import upload from '../middlewares/multer.js';

const doctorsRouter = express.Router();

// Route for doctor registration with file uploads
doctorsRouter.post(
  '/register',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'certificate', maxCount: 1 }
  ]),
  registerDoctor
);

// Route for doctor login
doctorsRouter.post('/login', loginDoctor);

export default doctorsRouter;
