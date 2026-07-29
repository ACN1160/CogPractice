import { useEffect, useState } from 'react'
import { getCustomers } from '../services/customerService'
import { getEmployees } from '../services/employeeService'

function HomePage() {
  const [summary, setSummary] = useState({ customers: 0, employees: 0 })

  useEffect(() => {
    async function loadSummary() {
      const [customers, employees] = await Promise.all([getCustomers(), getEmployees()])
      setSummary({
        customers: customers.length,
        employees: employees.length,
      })
    }

    loadSummary()
  }, [])

  return (
    <section className="page-card">
      <div className="page-intro">
        <p className="eyebrow">Welcome</p>
        <h2>Overview of the banking workspace</h2>
        <p>
          Explore the customer and employee records using the tabs above. The UI is separated into
          reusable page and service modules for easier expansion.
        </p>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <h3>{summary.customers}</h3>
          <p>Customers</p>
        </article>
        <article className="stat-card">
          <h3>{summary.employees}</h3>
          <p>Employees</p>
        </article>
      </div>
    </section>
  )
}

export default HomePage
