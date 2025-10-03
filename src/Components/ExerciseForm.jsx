import { useState } from "react"
import './ExerciseForm.css'

function ExerciseForm({ onAddWorkout }) {
    // Date().toISOString.split('T')[0] did not work - check
    const getTodayDate = () => {
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    // use State to manage form inputs
    const [formData, setFormData] = useState({
        exerciseName: '',
        sets: '',
        reps: '',
        weight: '',
        muscleGroup: '',
        date: ''
    })

    // handle input changes
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    // handle form submission
    const handleSubmit = (e) => {
        // no reload on form sumission
        e.preventDefault()

        const submissionData = {
            ...formData,
            date: formData.date || getTodayDate()
        }

        onAddWorkout(submissionData)
        
        // reset form
        setFormData({
            exerciseName: '',
            sets: '',
            reps: '',
            weight: '',
            muscleGroup: '',
            date: ''
        })
    }

  return (
    <div className="exercise-form-container">
      <h2>New Input</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
            <label htmlFor="exerciseName">Exercise</label>
            <input
                type="text"
                id="exerciseName"
                name="exerciseName"
                value={formData.exerciseName}
                onChange={handleChange}
                placeholder="eg: hardcore belly rub"
                required
            />
        </div>

        <div className="form-group">
            <label htmlFor="sets">Sets</label>
            <input
                type="number"
                id="sets"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                placeholder="1"
                min="1"
                required
            />
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="reps">Reps</label>
                <input 
                    type="number"
                    id="reps"
                    name="reps"
                    value={formData.reps}
                    onChange={handleChange}
                    placeholder="100+1 soldier!"
                    min="1"
                    required
                />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="weight">Weight (lbs)</label>
            <input 
                type="number" 
                id="weight"
                name="weight" 
                value={formData.weight}
                onChange={handleChange}
                placeholder="5 little bulldogs, aka 5 lbs"
                min="-100"
                required
            />
        </div>

        <div className="form-group">
            <label htmlFor="muscleGroup">Muscle Group</label>
            <select 
                id="muscleGroup"
                name="muscleGroup"
                value={formData.muscleGroup}
                onChange={handleChange}
                required >
                    <option value="">Select muscle group</option>
                    <option value="Chest">Chest</option>
                    <option value="Back">Back</option>
                    <option value="Legs">Legs</option>
                    <option value="Arms">Arms</option>
                    <option value="Core">Core</option>
                </select>
        </div>

        <div className="form-group">
            <label htmlFor="date">Date</label>
            <input 
                type="date" 
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
            />
        </div>

        <button type="submit" className="submit-btn">
            Add Exercise
        </button>
      </form>
    </div>
  )
}

export default ExerciseForm