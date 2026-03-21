# MedFlow 🏥🚀

**MedFlow** is an AI-powered full-stack healthcare platform designed to streamline the entire medical journey — from symptom analysis to doctor consultation, appointment booking, and emergency support.

Unlike traditional systems, MedFlow focuses on solving **real-world healthcare problems** such as:
- Difficulty in choosing the right doctor  
- Long waiting times  
- Lack of communication between patient and doctor  
- Emergency response delays  

---

## 🛠️ Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JSON Web Token (JWT)  
- **Payment Gateway**: Razorpay  
- **Real-time**: Socket.io  
- **APIs**: Google Maps API  
- **AI/ML**: OpenAI API / Machine Learning Models (for symptom analysis & doctor recommendation)

---

## 🚀 Core Features (Smart & Problem-Solving)

### 🧠 Symptom Checker + Doctor Recommendation
- Users enter symptoms  
- AI suggests:
  - Suitable doctor specialization  
  - Best matching doctors  
- Helps users choose the right doctor easily  

---

### 📍 Nearby Doctor + Live Availability
- Shows nearest doctors using map integration  
- Displays:
  - Distance  
  - Real-time availability  
- Helps users quickly find accessible healthcare  

---

### ⏱️ Real-Time Queue / Wait Time System
- Displays:
  - Current queue position  
  - Estimated waiting time  
- Reduces waiting uncertainty  
- Built using **Socket.io**  

---

### 💬 Doctor–Patient Chat + File Upload
- Real-time chat system  
- Upload reports (PDF/Image)  
- Enables remote consultation  

---

### 💊 Medicine Reminder System
- Automated reminders for medicines  
- Helps users follow prescriptions  
- Improves treatment consistency  

---

### 🚑 Emergency / Ambulance Button
- One-click emergency alert  
- Suggests nearest hospitals  
- Faster response during critical situations  

---

## 🔑 Existing Features

### 👥 Multi-Level Authentication

#### Patient
- Book, cancel, reschedule appointments  
- Secure online payments  
- Profile & appointment history  

#### Doctor
- Manage appointments  
- Earnings dashboard  
- Availability control  

#### Admin
- Manage doctors  
- Monitor appointments  
- View analytics  

---

## 💳 Payment Integration

- Razorpay integration  
- Secure and seamless transactions  

## 🌐 Project Setup

### Clone Repository
```bash
git clone https://github.com/your-username/medflow.git
cd medflow

## Install Dependencies
cd frontend
npm install

cd ../backend
npm install
## Environment Variables

Create a .env file in the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_API_KEY=your_razorpay_api_key
Run Project
npm run dev
## 📦 Folder Structure
medflow/
├── frontend/      # React Frontend
├── backend/       # Node.js Backend
├── admin/         # Admin Panel
├── utils/         # Utility Functions
```

## 🎯 Project Vision

MedFlow aims to build a smart healthcare ecosystem by combining AI, real-time systems, and user-friendly design to solve real-world healthcare challenges.
