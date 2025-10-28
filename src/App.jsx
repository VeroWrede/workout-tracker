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
  const [selectedWorkout, setSelectedWorkout] = useState(null)

  // filter and sort
  const [filters, setFilters] = useState({
    muscleGroup: 'All',
    sortBy: 'date-desc'
  })

  // add new workout
  const addWorkout = (workoutData) => {
    // create new wo with date stamp as unique ID
    const newWorkout = {
      id: Date.now(),
      date: workoutData.date,
      exercises: [{
        // why +1 ?
        id: Date.now() + 1,
        exerciseName: workoutData.exerciseName,
        muscleGroup: workoutData.muscleGroup,
        sets: [{
          setNumber: 1,
          reps: workoutData.reps,
          weight: workoutData.weight
        }]
      }]
    }

    // add new Workout to curr storage
    setWorkouts(prevWorkouts => [...prevWorkouts, newWorkout])
    console.log('Workout added to state: ', newWorkout)
  }

  const deleteWorkout = (id) => {
    setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout.id !== id))
    console.log(`Workout with ID ${id} has been deleted`)
  }

  // edit Workout 
  const updateWorkout = (id, updatedData) => {
    setWorkouts(prevWorkouts =>
      prevWorkouts.map(workout =>
        workout.id ===id ? { ...workout, ...updatedData } : workout
      )
    )
    // close editor
    setSelectedWorkout(null)
    console.log(`Workout with ID ${id} has been updated`)
  } 

  // open selected workout
  const openSelectedWorkout = (id) => {
    console.log('openSelectedWorkout called with id:', id)
    console.log('Previous selectedWorkout:', selectedWorkout)
    setSelectedWorkout(id)
  }

  // cancel editing
  const closeWorkout = () => {
    setSelectedWorkout(null)
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
      result = result.filter(workout => 
        workout.exercises.some(ex => ex.muscleGroup === filters.muscleGroup)
      )
    }

    // sort based on selection
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date)
        case 'date-asc':
          return new Date(a.date) - new Date(b.date)
        case 'weight-desc': {
          const maxWeightA = Math.max(...a.exercises.flatMap(ex => ex.sets.map(s => s.weight)))
          const maxWeightB = Math.max(...b.exercises.flatMap(ex => ex.sets.map(s => s.weight)))
          return maxWeightB - maxWeightA
        }
        case 'weight-asc': {
          const maxWeightA = Math.max(...a.exercises.flatMap(ex => ex.sets.map(s => s.weight)))
          const maxWeightB = Math.max(...b.exercises.flatMap(ex => ex.sets.map(s => s.weight)))
          return maxWeightA - maxWeightB
        }
        case 'name-asc':
          return a.exercises[0].exerciseName.localeCompare(b.exercises[0].exerciseName)
        case 'name-desc':
          return b.exercises[0].exerciseName.localeCompare(a.exercises[0].exerciseName)
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
          onDelete={deleteWorkout}
          onSelect={openSelectedWorkout}
          selectedWorkout={selectedWorkout}
          onUpdate={updateWorkout}
          onClose={closeWorkout}
        />
      </main>

      <footer>
        <p>Something funny</p>
      </footer>
    </div>
  )
}

export default App