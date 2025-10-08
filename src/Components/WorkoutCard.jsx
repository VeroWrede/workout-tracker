import './WorkoutCard.css'

function WorkoutCard({ workout }) {
  return (
    <div className="workout-card">
      <div className='Workout-card-header'>
        <h3>{workout.exerciseName}</h3>
        <span className="badge">{workout.muscleGroup}</span>
      </div>
      
      <div className='workout-card-body'>
        <div className="stat">
          <span className="stat-label">Sets</span>
          <span className="stat-value">{workout.sets}</span>
        </div>
        
        <div className="stat">
          <span className="stat-label">Reps</span>
          <span className="stat-value">{workout.reps}</span>
        </div>

        <div className="stat">
          <span className="stat-label">Weight</span>
          <span className="stat-value">{workout.weight} lbs</span>
        </div>
      </div>

      <div className="workout-card-footer">
        <span className="date">📅 {workout.date}</span>
      </div>
    </div>

  )
}

export default WorkoutCard