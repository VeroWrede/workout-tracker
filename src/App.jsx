import { useState, useMemo } from 'react'
import './App.css'
import ExerciseForm from './Components/ExerciseForm'
import FilterSort from './Components/FilterSort'
import WorkoutList from './Components/WorkoutList'
import { mockWorkouts } from './mockData'

function App() {
  // use State to store mock workouts for now
  const [workouts, setWorkouts] = useState(mockWorkouts)

  // track workout for editing
  const [editingWorkout, setEditingWorkout] = useState(null)

  // filter and sort
  const [filters, setFilters] = useState({
    muscleGroup: 'All',
    sortBy: 'date-desc'
  })

  // add new workout
  const addWorkout = (workoutData) => {
    // create new wo with date stamp as unique ID
    const newWO = {
      id: Date.now(),
      ...workoutData
    }
    // add new WO to curr storage
    setWorkouts(prevWorkouts => [...prevWorkouts, newWO])
    console.log('WO added to state: ', newWO)
  }

  const deleteWorkout = (id) => {
    setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id))
    console.log(`WO with ID ${id} has been deleted`)
  }

  // edit WO
  const updateWorkout = (id, updatedData) => {
    setWorkouts(prevWorkouts =>
      prevWorkouts.map(workout =>
        workout.id ===id ? { ...workout, ...updatedData } : workout
      )
    )
    // close editor
    setEditingWorkout(null)
    console.log(`Workout with ID ${id} has been updated`)
  } 

  // trigger editor
  const startEditing = (workout) => {
    setEditingWorkout(workout)
  }

  // cancel editing
  const cancelEditing = () => {
    setEditingWorkout(null)
  }

  // handle filtering
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  // handle sorting changes
  const handleSortChange = (sortBy) => {
    setFilters(prev => ({ ...prev, sortBy}))
  }

  // useMemo to prevent recalculation for each render
  const filteredAndSortedWorkouts = useMemo(() => {
    let result = [...workouts]

    // filter by muscleGroup
    if (filters.muscleGroup !== 'All') {
      result = result.filter(wo => wo.muscleGroup === filters.muscleGroup)
    }

    // sort based on selection
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date)
        case 'date-asc':
          return new Date(a.date) - new Date(b.date)
        case 'weight-desc':
          return b.weight - a.weight
        case 'weight-asc':
          return a.weight - b.weight
        case 'name-asc':
          return a.exerciseName.localeCompare(b.exerciseName)
        case 'name-desc':
          return b.exerciseName.localeCompare(a.exerciseName)
        default:
          return 0
      }
    })
    return result
  }, [workouts, filters])
 
  return (
    <div className="App">
      <header>
        <h1>Workout Tracker</h1>
        <p>Track your workout Progression</p>
      </header>
      
      <main>
        <ExerciseForm onAddWorkout={addWorkout} />

        <FilterSort 
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          workoutCount={filteredAndSortedWorkouts.length}
        />

        <WorkoutList 
          workouts={filteredAndSortedWorkouts} 
          onDeleteWorkout={deleteWorkout}
          onEditWorkout={startEditing}
          editingWorkout={editingWorkout}
          onUpdateWorkout={updateWorkout}
          onCancelEdit={cancelEditing}
        />
      </main>

      <footer>
        <p>Something funny</p>
      </footer>
    </div>
  )
}

export default App