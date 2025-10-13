import WorkoutCard from './WorkoutCard'
import './WorkoutList.css'

function WorkoutList({ 
  workouts, 
  onDeleteWorkout,
  onEditWorkout,
  editingWorkout,
  onUpdateWorkout,
  onCancelEdit
 }) {
  // check if there are workouts
  if(workouts.length === 0) {
    return (
      <div className="workout-list-container">
        <h2>Workouts History</h2>
        <p className='empty-state'>No workouts logged yet</p>
    </div>
    )
  }
  return (
    <div className="workout-list-container">
      <h2>Workout History ({workouts.length})</h2>
      <div className="workout-list">
        {workouts.map(workout => (
          <WorkoutCard 
            key={workout.id} 
            workout={workout} 
            onDelete={onDeleteWorkout}
            onEdit={onEditWorkout}
            isEditing={editingWorkout?.id === workout.id}
            onUpdate={onUpdateWorkout}
            onCancelEdit={onCancelEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default WorkoutList