import { useState } from 'react'
import './WorkoutCard.css'

function WorkoutCard({
  workout,
  onDelete,
  onSelect,
  selectedWorkout,
  onUpdate,
  onClose
}) {
  
  const handleEdit = () => {
    onUpdate(workout.id)
  }

  const handleDelete = () => {
    if (window.confirm(`Delete workout from ${workout.date}? This cannot be undone.`)) {
      onDelete(workout.id)
    }
  }

  const handleSelectClick = () => {
    console.log('handleSelectClick called for workout:', workout.id)
    onSelect(workout.id)
  }

  // check selected workout
  const isViewing = selectedWorkout === workout.id
  
  // get exercises and sets per workout 
  const totalExercises = workout.exercises.length
  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0)

  // get muscle groups hit during this workout
  const muscleGroups = [...new Set(workout.exercises.map(ex => ex.muscleGroup))]

  return (
    <>
    { isViewing && (
      <>
      <div className='modal-overlay' onClick={onClose}></div>

      <div className='workout-detail-modal'>
        <div className='modal-header'>
          <h2>{workout.date}</h2>
          <button className='close-modal-btn' onClick={onClose}> X </button>
        </div>

        <div className='modal-content'>
          {workout.exercises.map((exercise, index) => (
            <div key={exercise.id} className='exercise-detail'>
              <div className='exercise-header'>
                <h3>{index + 1} | {exercise.exerciseName}</h3>
                <span className='muscle-badge-small'>{exercise.muscleGroup}</span>
              </div>

              <table className='sets-table'>
                <thead>
                  <tr>
                    <th>Set</th>
                    <th>Reps</th>
                    <th>Weight (lbs)</th>
                  </tr>
                </thead>
                <tbody>
                  {exercise.sets.map(set => (
                    <tr key={set.setNumber}>
                      <td>{set.setNumber}</td>
                      <td>{set.reps}</td>
                      <td>{set.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className='modal-footer'>
          <button className='edit-btn' onClick={handleEdit}>Edit</button>
          <button className='delete-btn' onClick={handleDelete}>Delete</button>
        </div>
      </div>
      </>
    )}

     {/* Card preview - displayed in list */}
     <div className='workout-card' onClick={handleSelectClick}>
      <div className='card-header'>
        <h3>{workout.date}</h3>
        <div className='muscle-badges'>
          {muscleGroups.map(group => (
            <span key={group} className='muscle-badge'>{group}</span>
          ))}
        </div>
      </div>

      <div className='workout-summary'>
        <div className='summary-item'>
          <span className='summary-label'>Exercises</span>
          <span className='summary-value'>{totalExercises}</span>
        </div>
        <div className='summary-item'>
          <span className='summary-label'>NUmber of Sets</span>
          <span className='summary-value'>{totalSets}</span>
        </div>
      </div>

      <div className='exercise-preview'>
        {workout.exercises.map((ex, i) => (
          <div key={ex.id} className='exercise-preview-item'>
            {/* as list or bad cuz lost of generated <ul><li></li></ul>s ?*/}
             {ex.exerciseName}
          </div>
          ))}
        </div>

        <div className='card-action'>
          <span>View Details</span>
        </div>
     </div>
    </>
  )
}

export default WorkoutCard