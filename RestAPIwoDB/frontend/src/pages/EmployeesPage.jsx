import { useEffect, useState } from 'react'
import { getEmployees } from '../services/employeeService'

function EmployeesPage() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function loadEmployees() {
      const data = await getEmployees()
      setEmployees(data)
    }

    loadEmployees()
  }, [])

  return (
    <section className="page-card">
      <div className="page-intro">
        <p className="eyebrow">Employees</p>
        <h2>Employee directory</h2>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{`${employee.first_name || ''} ${employee.last_name || ''}`.trim()}</td>
                <td>{employee.email}</td>
                <td>{employee.hired_date || 'Not listed'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default EmployeesPage
