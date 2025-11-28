import { useState, useEffect } from 'react'
import { employeeAPI } from '../services/api'
import EmployeeForm from '../components/EmployeeForm'

function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await employeeAPI.getAll()
      setEmployees(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to load employees')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddEmployee = async (employeeData) => {
    try {
      await employeeAPI.create(employeeData)
      fetchEmployees()
      setShowForm(false)
    } catch (err) {
      alert('Failed to add employee')
      console.error(err)
    }
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="employees">
      <div className="page-header">
        <h2>Employees</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Employee'}
        </button>
      </div>

      {showForm && (
        <EmployeeForm onSubmit={handleAddEmployee} onCancel={() => setShowForm(false)} />
      )}

      <div className="employee-grid">
        {employees.map(employee => (
          <div key={employee.id} className="employee-card">
            <h3>{employee.name}</h3>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Department:</strong> {employee.department || 'N/A'}</p>
            <p><strong>Position:</strong> {employee.position || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Employees
