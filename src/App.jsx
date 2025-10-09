import { useState } from 'react'
import './App.css'
import ExerciseForm from './Components/ExerciseForm'
import FilterSort from './Components/FilterSort'
import WorkoutList from './Components/WorkoutList'
import { mockWorkouts } from './mockData'

function App() {
  // use State to store workouts for now
  const [workouts, setWorkouts] = useState(mockWorkouts)

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
 
  return (
    <div className="App">
      <header>
        <h1>Workout Tracker</h1>
        <p>Track your workout Progression</p>
      </header>
      
      <main>
        <ExerciseForm onAddWorkout={addWorkout} />

        {/* Filter and sort controls */}
        <FilterSort />

        <WorkoutList workouts={workouts} onDeleteWorkout={deleteWorkout}/>
      </main>

      <footer>
        <p>Something funny</p>
      </footer>
    </div>
  )
}

export default App