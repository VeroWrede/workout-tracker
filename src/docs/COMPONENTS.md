# Component Documentation

This document provides a comprehensive reference for all components in the Workout Tracker application.

---

## Component Hierarchy

```
App.jsx (root)
├── ExerciseForm.jsx
├── FilterSort.jsx
├── WorkoutList.jsx
│   └── WorkoutCard.jsx (multiple instances)
└── ProgressChart.jsx
```

---

## Data Flow Overview

```
User Input (ExerciseForm)
    ↓
App.jsx (manages workouts state)
    ↓
WorkoutList.jsx (passes data down)
    ↓
WorkoutCard.jsx (displays individual workouts)
```

**State Management:**
- Workout data and UI state live in `App.jsx`
- Child components receive data via props and communicate back via callback functions

---

## Component Reference

### **App.jsx** (Parent Component)

**Purpose:** Central state management and orchestration

**State:**
```javascript
workouts: Array<Workout>        // All workout sessions
selectedWorkout: number | null  // ID of workout being viewed in modal
```

**Functions:**
| Function | Parameters | Purpose |
|----------|-----------|---------|
| `addWorkout()` | formData | Creates new workout session |
| `deleteWorkout()` | id | Removes workout by ID |
| `updateWorkout()` | id, updated data | Saves the updates to a workout |
| `openSelectedWorkout()` | id | Opens modal for specific workout |
| `closeWorkout()` | none | Closes the detail modal |
| `handleFilterChange()` | filters | Filters workouts by muscle group |
| `handleSortChange()` | sortType | Sorts workouts by date/weight/name |

---

### **ExerciseForm.jsx**

**Purpose:** Form for adding new workout sessions

**Internal State:**
```javascript
formData: {
  exerciseName: string
  sets: number
  reps: number
  weight: number
  muscleGroup: string
  date: string
}
```

**Functions:**
| Function | Purpose |
|----------|---------|
| `getTodayDate()` | Returns current date in YYYY-MM-DD format |
| `handleChange()` | Updates form fields as user types |
| `handleSubmit()` | Validates and submits form data |

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `onAddWorkout` | function | Callback to add workout to App state |

**Form Fields:**
- Exercise Name (text, required)
- Sets (number, min: 1, required)
- Reps (number, min: 1, required)
- Weight (number, min: -100, required)
- Muscle Group (select, required)
- Date (date picker, defaults to today)

---

### **FilterSort.jsx**

**Purpose:** Controls for filtering and sorting workout display

**Internal State:**
```javascript
filters: {
  muscleGroup: string  // 'All' | 'Chest' | 'Back' | 'Legs' | 'Arms' | 'Core'
  sortBy: string       // 'date-desc' | 'date-asc' | 'weight-desc' | etc.
}
```

**Functions:**
| Function | Purpose |
|----------|---------|
| `handleMuscleGroupChange()` | Updates muscle group filter |
| `handleSortChange()` | Updates sort order |
| `handleClearFilters()` | Resets to default filters |

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `onFilterChange` | function | Callback when filter changes |
| `onSortChange` | function | Callback when sort changes |
| `workoutCount` | number | Total number of workouts (for display) |

**Filter Options:**
- **Muscle Groups:** All, Chest, Back, Legs, Arms, Core
- **Sort Options:**
  - Date (Newest/Oldest First)
  - Weight (Heaviest/Lightest First)
  - Exercise Name (A-Z / Z-A)

---

### **WorkoutList.jsx**

**Purpose:** Container component that lists workouts and renders them using the WorkoutCard componemt

**Empty State:**
Shows "No workouts logged yet" message when `workouts.length === 0`

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `workouts` | Array<Workout> | Filtered/sorted array of workouts |
| `onDelete` | function | Callback to delete workout |
| `onSelect` | function | Callback to open workout modal |
| `selectedWorkout` | number | null | ID of currently viewed workout |
| `onUpdate` | function | Callback to update workout data |
| `onClose` | function | Callback to close modal |

**Responsibilities:**
- Renders empty state when no workouts exist
- Maps through workouts array
- Passes props down to individual WorkoutCard components
- Displays workout count in header

---

### **WorkoutCard.jsx**

**Purpose:** Displays individual workout summary and detailed modal view

**Functions:**
| Function | Purpose |
|----------|---------|
| `handleEdit()` | Updates workout |
| `handleDelete()` | Confirms then deletes workout |
| `handleSelectClick()` | Opens modal for this workout |

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `workout` | Workout | Workout data object |
| `onDelete` | function | Callback to delete this workout |
| `onSelect` | function | Callback to open modal |
| `selectedWorkout` | number \| null | ID of currently selected workout |
| `onUpdate` | function | Callback to update workput data |
| `onClose` | function | Callback to close modal |

**Internal Calculations:**
```javascript
isViewing: boolean           // Is THIS card's modal open?
totalExercises: number       // Count of exercises in workout
totalSets: number           // Total sets across all exercises
muscleGroups: Array<string> // Unique muscle groups in workout
```

**Two Views:**

1. **Card Preview (always visible)**
   - Date
   - Muscle group badges
   - Exercise count
   - Total sets count
   - List of exercise names
   - "View Details" action

2. **Modal Details (conditional - when `isViewing === true`)**
   - Full workout details
   - Each exercise with sets table
   - Delete button
   - Close button (X) and overlay click to close

---

### **ProgressChart.jsx**

**Purpose:** (Placeholder) Will display workout progress visualizations

**Status:** Not yet implemented

**Planned Features:**
- Progress over time charts
- Personal records tracking
- Volume/intensity trends

---

## Data Structures

### **Workout Object**
```javascript
{
  id: number,
  date: string,  // YYYY-MM-DD format
  exercises: Array<Exercise>
}
```

### **Exercise Object**
```javascript
{
  id: number,
  exerciseName: string,
  muscleGroup: string,
  sets: Array<Set>
}
```

### **Set Object**
```javascript
{
  setNumber: number,
  reps: number,
  weight: number
}
```
---

## 🐛 Known Issues & TODO

- [ ] ExerciseForm currently adds single exercises, not full workout sessions
- [ ] Need to handle multiple sets per exercise in form
- [ ] ProgressChart component not implemented
- [ ] Add updated edit functionality to WorkoutCard modal

---

## Naming Conventions

**Props:**
- Callback functions: `onActionName` (e.g., `onDeleteWorkout`, `onAddWorkout`)
- Data props: descriptive nouns (e.g., `workout`, `workouts`, `selectedWorkout`)

**Functions:**
- Event handlers: `handleEventName` (e.g., `handleSubmit`, `handleDelete`)
- Pure functions: descriptive verbs (e.g., `getTodayDate`, `filterWorkouts`)

**State:**
- Descriptive nouns (e.g., `formData`, `workouts`, `filters`)

---

*Last Updated: October 26, 2025*