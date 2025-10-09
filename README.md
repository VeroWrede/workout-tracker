# React Workout Tracker

A modern, intuitive React application for tracking your fitness journey. 
Built with Vite + React, you can use this app to log your exercises, track progress, and stay motivated with your workouts!
This is a personal learning project, I welcome feedback and suggestions!

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

> [!IMPORTANT] This app is still in progress, more features and improvements are on the way :) 

> ## 📸 Screenshots:  *Screenshots coming soon!*

## Features

- **Add Exercises** - Log exercises with sets, reps, weight, and muscle groups
- **View History** - See all your workouts in beautifully designed cards
- **Date Tracking** - Workouts are automatically timestamped if you don't set a custom date
- **Modern UI** - Clean, responsive design with smooth animations
- **Fast Performance** - Built with Vite for lightning-fast development and production builds

### Goal Features
- [x] Add Exercises: Log exercises with sets, reps, weight, and muscle groups
- [x] View History: See all your workouts in beautifully designed cards
- [x] Date Tracking: Workouts are automatically timestamped if you don't set a custom date
- [x] Modern UI: Clean, responsive design with smooth animations
- [x] Fast Performance: Built with Vite for lightning-fast development and production builds
- [ ] Edit and delete workout entries
- [ ] Filter workouts by muscle group
- [ ] Sort by date, weight, or exercise name
- [ ] Progress charts and data visualization
- [ ] Backend integration for persistent data storage
- [ ] User authentication
- [ ] Personal records (PRs) tracking
- [ ] Export workout data
- [ ] Dark mode theme
- [ ] Maybe: Exercise library with instructions

> ## Demo

> *Live demo link coming soon!*

## Built With

- **[React](https://react.dev/)** - UI library for building component-based interfaces
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Modern JavaScript features

## Learning Objectives

This project was built to demonstrate and practice:

- React Hooks (`useState`, `useEffect`)
- Component composition and reusability
- Props and lifting state up
- Controlled form inputs
- Array manipulation (map, filter, sort)
- Git version control

## Installation & Setup

### Prerequisites

- Node.js (v20 or higher)
- npm (v10 or higher)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/YOUR-USERNAME/workout-tracker.git
   cd workout-tracker
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start the dev server**
```bash
   npm run dev
```

4. **Open in browser:** Navigate to ```http://localhost:5173/```

### Usage

1. **Add a Workout:** Fill out the exercise form with:

- Exercise name (e.g., "Bench Press")
- Number of sets
- Number of reps
- Weight lifted
- Muscle group
- Date (optional - defaults to today)

2. **View Workouts:** Scroll down to see your workout history displayed in cards

### Project Structure 
```
workout-tracker/
├── public/              # Static assets
├── src/
│   ├── Components/      # React components
│   │   ├── ExerciseForm.jsx
│   │   ├── ExerciseForm.css
│   │   ├── WorkoutList.jsx
│   │   ├── WorkoutList.css
│   │   ├── WorkoutCard.jsx
│   │   ├── WorkoutCard.css
│   │   ├── FilterSort.jsx
│   │   └── ProgressChart.jsx
│   ├── mockData.js      # Sample workout data
│   ├── App.jsx          # Main app component
│   ├── App.css          # Global styles
│   └── main.jsx         # App entry point
├── package.json
├── vite.config.js
└── README.md
```


