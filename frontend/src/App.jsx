import { useState, useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Employees from './pages/Employees'
import Login from './pages/Login'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  const isAdmin = user?.role === 'admin'

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <h1>Employee Task Tracker</h1>
        </div>
        <div className="nav-links">
          <button 
            className={currentPage === 'dashboard' ? 'active' : ''}
            onClick={() => setCurrentPage('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={currentPage === 'tasks' ? 'active' : ''}
            onClick={() => setCurrentPage('tasks')}
          >
            Tasks
          </button>
          {isAdmin && (
            <button 
              className={currentPage === 'employees' ? 'active' : ''}
              onClick={() => setCurrentPage('employees')}
            >
              Employees
            </button>
          )}
        </div>
        <div className="nav-user">
          <span className="user-info">
            {user?.username} ({user?.role})
          </span>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'tasks' && <Tasks user={user} />}
        {currentPage === 'employees' && isAdmin && <Employees />}
      </main>
    </div>
  )
}

export default App
