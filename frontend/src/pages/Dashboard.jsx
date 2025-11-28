import { useState, useEffect } from 'react'
import { dashboardAPI, taskAPI, employeeAPI } from '../services/api'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [tasks, setTasks] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [statsRes, tasksRes, employeesRes] = await Promise.all([
        dashboardAPI.getStats(),
        taskAPI.getAll(),
        employeeAPI.getAll()
      ])
      setStats(statsRes.data)
      setTasks(tasksRes.data)
      setEmployees(employeesRes.data)
      setError(null)
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading dashboard...</div>
  if (error) return <div className="error">{error}</div>
  if (!stats) return null

  // Prepare chart data
  const statusData = [
    { name: 'Completed', value: stats.completedTasks, color: '#27ae60' },
    { name: 'In Progress', value: stats.inProgressTasks, color: '#f39c12' },
    { name: 'Pending', value: stats.pendingTasks, color: '#e74c3c' }
  ]

  const priorityData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'High').length, color: '#e74c3c' },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'Medium').length, color: '#f39c12' },
    { name: 'Low', value: tasks.filter(t => t.priority === 'Low').length, color: '#27ae60' }
  ]

  // Tasks by employee
  const tasksByEmployee = employees.map(emp => ({
    name: emp.name.split(' ')[0],
    tasks: tasks.filter(t => t.employee_id === emp.id).length,
    completed: tasks.filter(t => t.employee_id === emp.id && t.status === 'Completed').length
  }))

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>📊 Dashboard Overview</h2>
        <button className="btn-refresh" onClick={fetchData}>🔄 Refresh</button>
      </div>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Tasks</h3>
            <p className="stat-number">{stats.totalTasks}</p>
          </div>
        </div>
        
        <div className="stat-card stat-card-success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Completed</h3>
            <p className="stat-number">{stats.completedTasks}</p>
          </div>
        </div>
        
        <div className="stat-card stat-card-warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>In Progress</h3>
            <p className="stat-number">{stats.inProgressTasks}</p>
          </div>
        </div>
        
        <div className="stat-card stat-card-danger">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>Pending</h3>
            <p className="stat-number">{stats.pendingTasks}</p>
          </div>
        </div>
        
        <div className="stat-card stat-card-info">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Completion Rate</h3>
            <p className="stat-number">{stats.completionRate}%</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${stats.completionRate}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="stat-card stat-card-purple">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Employees</h3>
            <p className="stat-number">{stats.totalEmployees}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Task Status Distribution */}
        <div className="chart-card">
          <h3>📊 Task Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Distribution */}
        <div className="chart-card">
          <h3>🎯 Priority Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3498db">
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks by Employee */}
        <div className="chart-card chart-card-wide">
          <h3>👤 Tasks by Employee</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tasksByEmployee}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#3498db" name="Total Tasks" />
              <Bar dataKey="completed" fill="#27ae60" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="insights-section">
        <h3>💡 Quick Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <span className="insight-icon">🏆</span>
            <div>
              <p className="insight-label">Most Productive</p>
              <p className="insight-value">
                {tasksByEmployee.length > 0 
                  ? tasksByEmployee.reduce((max, emp) => emp.completed > max.completed ? emp : max).name
                  : 'N/A'}
              </p>
            </div>
          </div>
          
          <div className="insight-card">
            <span className="insight-icon">⚡</span>
            <div>
              <p className="insight-label">Avg Tasks per Employee</p>
              <p className="insight-value">
                {stats.totalEmployees > 0 ? (stats.totalTasks / stats.totalEmployees).toFixed(1) : 0}
              </p>
            </div>
          </div>
          
          <div className="insight-card">
            <span className="insight-icon">🎯</span>
            <div>
              <p className="insight-label">High Priority Tasks</p>
              <p className="insight-value">
                {tasks.filter(t => t.priority === 'High').length}
              </p>
            </div>
          </div>
          
          <div className="insight-card">
            <span className="insight-icon">📅</span>
            <div>
              <p className="insight-label">Tasks Due Soon</p>
              <p className="insight-value">
                {tasks.filter(t => {
                  if (!t.due_date) return false
                  const dueDate = new Date(t.due_date)
                  const today = new Date()
                  const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24))
                  return diffDays >= 0 && diffDays <= 7 && t.status !== 'Completed'
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
