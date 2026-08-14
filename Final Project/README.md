# 🚗 Car Rental Web Application

A responsive car rental web application built with **React and Vite**. The application allows users to browse available cars, view car details, rent vehicles, and review their rental history. It also includes an admin interface for managing the car inventory.

This project was developed as a **Final Front-End Project** during the Exalt Front-End Training Program.

## 🔑 Demo Accounts

You can use the following demo accounts to explore the application.

### 🌐 Live Demo

[Open Car Rental Web Application](https://car-rental-wine-eta.vercel.app/)

### 👤 Normal User

- Email: `normal@normal.com`
- Password: `normal123`

### 🔐 Admin User

- Email: `admin@admin.com`
- Password: `admin123`

> The Normal User can browse cars, rent vehicles, and view rental history.
> The Admin User has additional permissions to manage the car inventory, including adding, updating, and deleting cars.

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

```

## 🚀 Getting Started
- Clone the repository
```git clone https://github.com/samaabosair/ExaltFETraining2025.git```

### Navigate to the project
- cd ExaltFETraining2025
- cd "Final Project"

### Install dependencies
``` npm install```

The application will be available at the local URL provided by Vite in the terminal.

## 📜 Available Scripts

### Start development server
``` npm run dev```

### Build for production
``` npm run build```

### Preview production build
``` npm run preview```

### Run ESLint
``` npm run lint```

## 🧪 Testing
#### The project uses Cypress for end-to-end testing.
- Run Cypress in interactive mod
```npx cypress open```
-Run Cypress tests in headless mode:
```npx cypress run```

## 🔥 Firebase

**Firebase is used as the application's backend service.**

The project uses:

-Firebase Authentication for user authentication
-Cloud Firestore for storing cars and rental data
-Firebase Storage for car images

The application supports retrieving, creating, updating, and deleting car records.

## 🎨 UI & User Experience
The application was designed with a focus on:
- Simple navigation
- Clear car information
- Responsive layouts
- Easy rental workflow
- Reusable UI components
- Separate user and admin experiences

## 💡 Key Learning Outcomes

Through this project, I gained practical experience in:

- 3Building applications with React
- Creating reusable components
- Implementing routing
- Working with Firebase
- Implementing authentication
- Working with Firestore
- Performing CRUD operations
- Managing asynchronous data
- Using React Query for data fetching
- Managing application state
- Writing end-to-end tests with Cypress
- Designing responsive user interfaces

## 👩‍💻 Author
Computer Engineering Graduate
Front-End Developer
