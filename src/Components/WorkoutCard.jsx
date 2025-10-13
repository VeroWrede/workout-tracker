import { useState } from 'react'
import './WorkoutCard.css'

function WorkoutCard({ 
  workout, 
  onDelete,
  onEdit,
  isEditing,
  onUpdate,
  onCancelEdit 
}) {
  // use state for edit data
  const [editData, setEditData] = useState({
    exerciseName: workout.exerciseName,
    sets: workout.sets,
    reps: workout.reps,
    weight: workout.weight,
    muscleGroup: workout.muscleGroup,
    date: workout.date
  })

  const handleDelete = () => {
    if (window.confirm(`Delete ${workout.exerciseName}? This cannot be undone.`)) {
      onDelete(workout.id)
    }
  }

  const handleEdit = () => {
    onEdit(workout)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target 
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    onUpdate(workout.id, editData)
  }

  const handleEditCancel = () => {
    // reset form to original values
    setEditData({
      exerciseName: workout.exerciseName,
      sets: workout.sets,
      reps: workout.reps,
      weight: workout.weight,
      muscleGroup: workout.muscleGroup,
      date: workout.date
    })
    onCancelEdit()
  }

  return (
    <>
    {isEditing && <div className='modal-overlay' onClick={handleEditCancel}></div>}

    <div className={`workout-card ${isEditing ? 'editing-mode' : ''}`}>
      {isEditing ? (
        // edit form view 
        <form onSubmit={handleSaveEdit} classname='edit-form'>
          <h3>Edit Workout</h3>

          <div className='edit-form-group'>
            <label htmlFor="edit-form-group">Exercise</label>
            <input 
              type="text"
              id='edit-exerciseName'
              name="exerciseName"
              value={editData.exerciseName}
              onChange={handleEditChange}
              required
            />
          </div>

          <div className='edit-form-row'>
            <div className='edit-form-group'>
              <label htmlFor="edit-sets">Sets</label>
              <input 
                type="number"
                id="edit-sets"
                name="sets"
                value={editData.sets}
                onChange={handleEditChange}
                min="1"
                required  
              />
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-reps">Reps</label>
              <input 
                type="number"
                id="edit-reps"
                name="reps"
                value={editData.reps}
                onChange={handleEditChange}
                min="1"
                required  
              />
            </div>

            <div className="edit-form-group">
              <label htmlFor="edit-weight">Weight (lbs)</label>
              <input 
                type="number" 
                id="edit-weight" 
                name="weight"
                value={editData.weight}
                onChnge={handleEditChange}
                min="-100"
                step="0.5"
                required 
              />
            </div>
          </div>

          <div className="edit-form-group">
            <label htmlFor="edit-muscleGroup">Muscle Group</label>
            <select 
              id="edit-muscleGroup"
              name="muscleGroup"
              value={editData.musclegroup}
              onChange={handleEditChange}
              required 
            >
              <option value="Chest">Chest</option>
              <option value="Back">Back</option>
              <option value="Legs">Legs</option>
              <option value="Arms">Arms</option>
              <option value="Core">Core</option>
            </select>
          </div>

          <div className="edit-form-group">
            <label htmlFor="edit-date">Date</label>
            <input 
              type="date"
              id="edit-date"
              name="date"
              value={editData.date}
              onChange={handleEditChange}
              required 
            />
          </div>

          <div className="edit-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="submit" className="cancel-btn" onClick={handleEditCancel}>Cancel edit</button>
          </div>
        </form>
      ) : (
        // normal non-edit card view
        <>
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
              <span className="date">{workout.date}</span>
            </div>
            <div className='card-actions'>
              <button className="edit-btn" onClick={handleEdit}>Edit</button>
              <button className='delete-btn' onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  )
}

export default WorkoutCard