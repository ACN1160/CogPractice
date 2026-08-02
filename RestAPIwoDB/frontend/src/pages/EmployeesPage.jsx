import { useEffect, useState } from 'react'
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../services/employeeService'

const EMPTY_FORM = { first_name: '', last_name: '', email: '', hired_date: '', username: '', password: '' }

function EmployeeModal({ employee, onClose, onSave }) {
  const [form, setForm] = useState(
    employee
      ? { 
        first_name: employee.first_name, 
        last_name: employee.last_name, 
        email: employee.email, 
        hired_date: employee.hired_date ? employee.hired_date.slice(0, 10) : '',
        username: employee.username,
        password: employee.password
      }
      : EMPTY_FORM
  )
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await onSave(form)
      onClose()
    } catch (err) {
      setError(err.message || 'An error occurred')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>{employee ? 'Edit Employee' : 'Add Employee'}</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            First Name
            <input name="first_name" value={form.first_name} onChange={handleChange} required />
          </label>
          <label>
            Last Name
            <input name="last_name" value={form.last_name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Hired Date
            <input name="hired_date" type="date" value={form.hired_date} onChange={handleChange} />
          </label>
          <label>
            Username
            <input name="username" value={form.username} onChange={handleChange} required />
          </label>
          <label>
            Password
            <input name="password" type="password" value={form.password} onChange={handleChange} required />
          </label>
          {error && <p className="modal-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="action-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="action-button edit">{employee ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function EmployeesPage() {
  const [employees, setEmployees] = useState([])
  const [modalEmployee, setModalEmployee] = useState(undefined)
  const [error, setError] = useState('')

  async function loadEmployees() {
    const data = await getEmployees()
    setEmployees(data)
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  async function handleSave(form) {
    if (modalEmployee) {
      await updateEmployee(modalEmployee.id, form)
    } else {
      await addEmployee(form)
    }
    await loadEmployees()
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this employee?')) return
    try {
      await deleteEmployee(id)
      await loadEmployees()
    } catch (err) {
      setError(err.message || 'Delete failed')
    }
  }

  return (
    <section className="page-card">
      <div className="page-intro" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="eyebrow">Employees</p>
          <h2>Employee directory</h2>
        </div>
        <button type="button" className="action-button edit" onClick={() => setModalEmployee(null)}>
          + Add Employee
        </button>
      </div>

      {error && <p className="modal-error">{error}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Hired Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{`${employee.first_name || ''} ${employee.last_name || ''}`.trim()}</td>
                <td>{employee.email}</td>
                <td>{employee.hired_date ? employee.hired_date.slice(0, 10) : 'Not listed'}</td>
                <td>
                  <div className="action-buttons">
                    <button type="button" className="action-button edit" onClick={() => setModalEmployee(employee)}>
                      Edit
                    </button>
                    <button type="button" className="action-button delete" onClick={() => handleDelete(employee.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalEmployee !== undefined && (
        <EmployeeModal
          employee={modalEmployee}
          onClose={() => setModalEmployee(undefined)}
          onSave={handleSave}
        />
      )}
    </section>
  )
}

export default EmployeesPage
