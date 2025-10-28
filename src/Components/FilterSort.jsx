import { useState } from "react"
import './FilterSort.css'

function FilterSort({ 
  onFilterChange, 
  onSortChange, 
  workoutCount }) 
  {
  const [filters, setFilters] = useState({
    muscleGroup: 'All',
    // get newest first
    sortBy: 'date-desc'
  })

  const handleMuscleGroupChange = (e) => {
    const newFilters = { ...filters, muscleGroup: e.target.value}
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSortChange = (e) => {
    const newFilters = { ...filters, sortBy: e.target.value}
    setFilters(newFilters)
    onSortChange(e.target.value)
  }

  const handleClearFilters = () => {
    const defaultFilters = { muscleGroup: 'All', sortBy: 'date-desc'}
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
    onSortChange('date-desc')
  }

  return (
    <div className="filter-sort-container">
      <div className="filter-sort-header">
        <h3>Filter / Sort</h3>
        <span className="workout-count">{workoutCount} workouts </span>
      </div>

      <div className="filter-sort-controls">
        <div className="control-group">
          <label htmlFor="muscle-filter">Muscle Group</label>
          <select 
            id="muscle-filter"
            value={filters.muscleGroup}
            onChange={handleMuscleGroupChange}
          >
            <option value="All">All Muscle Groups</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Arms">Arms</option>
            <option value="Core">Core</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort-select">Sort by</label>
          <select id="sort-select"
          value={filters.sortBy}
          onChange={handleSortChange}
          >
            <option value="date-desc">Date (Newest First)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="weight-desc">Weight (Heaviest First)</option>
            <option value="weight-asc">Weight (Lightest First)</option>
            <option value="name-asc">Exercise Name (A-Z)</option>
            <option value="name-desc">Exercise Name (Z-A)</option>
          </select>
        </div>

        <button className="clear-filters-btn" 
          onClick={handleClearFilters}>Clear Filter</button>
      </div>
    </div>
  )
}

export default FilterSort