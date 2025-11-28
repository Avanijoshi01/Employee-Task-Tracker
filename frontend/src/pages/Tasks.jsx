import { useState, useEffect } from 'react'
import { taskAPI, employeeAPI } from '../services/api'
import TaskForm from '../components/TaskForm'

function Tasks({ user }) {
  const [tasks, setTasks] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filters, setFilters] = useState({
    status: '',
    employee_id: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    fetchTasks()
    fetchEmployees()
  }, [filters])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await taskAPI.getAll(filters)
      setTasks(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load tasks')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll()
      setEmployees(response.data)
    } catch (err) {
      console.error('Failed to load employees', err)
    }
  }

  const handleAddTask = async (taskData) => {
    try {
      await taskAPI.create(taskData)
      fetchTasks()
      setShowForm(false)
    } catch (err) {
      alert('Failed to add task')
      console.error(err)
    }
  }

  const handleUpdateTask = async (taskData) => {
    try {
      await taskAPI.update(editingTask.id, taskData)
      fetchTasks()
      setEditingTask(null)
    } catch (err) {
      alert('Failed to update task')
      console.error(err)
    }
  }

  const handleDeleteTask = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return
    
    try {
      await taskAPI.delete(id)
      fetchTasks()
    } catch (err) {
      alert('Failed to delete task')
      console.error(err)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-')
  }

  const getPriorityClass = (priority) => {
    return `priority-${priority.toLowerCase()}`
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="tasks">
      <div className="page-header">
        <h2>{isAdmin ? 'All Tasks' : 'My Tasks'}</h2>
        {isAdmin && (
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Task'}
          </button>
        )}
      </div>

      <div className="filters">
        <div className="filter-group search-group">
          <label>🔍 Search Tasks:</label>
          <input
            type="text"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>Filter by Status:</label>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {isAdmin && (
          <div className="filter-group">
            <label>Filter by Employee:</label>
            <select name="employee_id" value={filters.employee_id} onChange={handleFilterChange}>
              <option value="">All</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {showForm && (
        <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />
      )}

      {editingTask && (
        <TaskForm 
          task={editingTask} 
          onSubmit={handleUpdateTask} 
          onCancel={() => setEditingTask(null)} 
        />
      )}

      <div className="tasks-list">
        {tasks
          .filter(task => 
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
          )
          .map(task => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <h3>{task.title}</h3>
              <div className="task-badges">
                <span className={`badge ${getStatusClass(task.status)}`}>{task.status}</span>
                <span className={`badge ${getPriorityClass(task.priority)}`}>{task.priority}</span>
              </div>
            </div>
            
            <p className="task-description">{task.description}</p>
            
            <div className="task-meta">
              <p><strong>Assigned to:</strong> {task.employee_name || 'Unassigned'}</p>
              {task.due_date && <p><strong>Due:</strong> {new Date(task.due_date).toLocaleDateString()}</p>}
            </div>

            {isAdmin && (
              <div className="task-actions">
                <button className="btn-edit" onClick={() => setEditingTask(task)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ).length === 0 && (
        <div className="empty-state">
          <p>{searchTerm ? 'No tasks match your search.' : 'No tasks found. Add a new task to get started!'}</p>
        </div>
      )}
    </div>
  )
}

export default Tasks
