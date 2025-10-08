import WorkoutCard from './WorkoutCard'
import './WorkoutList.css'

function WorkoutList({ workouts }) {
  // check if there are workouts
  if(workouts.length === 0) {
    <div className="workout-list-container">
        <h2>Workouts History</h2>
        <p className='empty-state'>No workouts logged yet</p>
    </div>
  }
  return (
    <div className="workout-list-container">
      <h2>Workout History ({workouts.length})</h2>
      <div className="workout-list">
        {workouts.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  )
}

export default WorkoutList