# 🚗 Car Rental Web Application

A responsive car rental web application built with **React and Vite**. The application allows users to browse available cars, view car details, rent vehicles, and review their rental history. It also includes an admin interface for managing the car inventory.

This project was developed as a **Final Front-End Project** during the Exalt Front-End Training Program.

## ✨ Features

### 👤 User Features
- User authentication with email and password
- Browse available cars
- View detailed information about individual cars
- Rent available vehicles
- View personal rental history
- Responsive and user-friendly interface

### 🔐 Admin Features
- Admin authentication
- View the complete car inventory
- Add new cars
- Add car images
- Update existing car information
- Delete cars
- View rental information

### ⚙️ Application Features
- Dynamic routing
- Firebase Authentication
- Firebase Firestore database
- Firebase Storage
- CRUD operations for cars
- Loading and error states
- Reusable React components
- End-to-end testing with Cypress

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router
- React Bootstrap
- Bootstrap
- Framer Motion

### Backend / Data
- Firebase Authentication
- Firebase Firestore
- Firebase Storage

### State & Data Management
- TanStack React Query
- Zustand

### Testing & Development
- Cypress
- ESLint
- Vite

## 📁 Project Structure

```text
Final Project/
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   └── support/
│
├── public/
│   └── carlogo.jpg
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   ├── firebase.js
│   │   └── carService.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── package.json
├── vite.config.js
└── cypress.config.js


### 🚀 Getting Started
1. Clone the repository
git clone https://github.com/samaabosair/ExaltFETraining2025.git

2. Navigate to the project
cd ExaltFETraining2025
cd "Final Project"

3. Install dependencies
npm install

The application will be available at the local URL provided by Vite in the terminal.

### 📜 Available Scripts

Start development server
npm run dev

Build for production
npm run build

Preview production build
npm run preview

Run ESLint
npm run lint
