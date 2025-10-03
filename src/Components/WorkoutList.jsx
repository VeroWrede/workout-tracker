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
      <h2>Workouts History ({workouts.length})</h2>
      <div className="workout-list">
        {workouts.map(workout => (
          <div key={workout.id} className="workout-item">
            <h3>{workout.exerciseName}</h3>
            <div className="workout-details">
              <span className="badge">{workout.muscleGroup}</span>
              <span>sets: {workout.sets}</span>
              <span>{workout.weight} lbs</span>
              <span className="date">{workout.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkoutList