import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { postData } from '../services/api'

function EmployeeDashboard() {
  const { user, userType, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('customers')
  const [customers, setCustomers] = useState([])
  const [employees, setEmployees] = useState([])
  const [allCheckingAccounts, setAllCheckingAccounts] = useState([])
  const [allSavingsAccounts, setAllSavingsAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!user || userType !== 'employee') {
      navigate('/')
    }
  }, [user, userType, navigate])

  useEffect(() => {
    if (activePage === 'customers') {
      loadCustomers()
    } else if (activePage === 'employees') {
      loadEmployees()
    } else if (activePage === 'checking') {
      loadCheckingAccounts()
    } else if (activePage === 'savings') {
      loadSavingsAccounts()
    }
  }, [activePage])

  async function loadCustomers() {
    try {
      setLoading(true)
      const response = await fetch('/api/v1/customers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      })
      if (response.ok) {
        setCustomers(await response.json())
      }
    } catch (err) {
      setError('Failed to load customers')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function loadEmployees() {
    try {
      setLoading(true)
      const response = await fetch('/api/v1/employees', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      })
      if (response.ok) {
        setEmployees(await response.json())
      }
    } catch (err) {
      setError('Failed to load employees')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function loadCheckingAccounts() {
    try {
      setLoading(true)
      const response = await fetch('/api/v1/checkings', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      })
      if (response.ok) {
        setAllCheckingAccounts(await response.json())
      }
    } catch (err) {
      setError('Failed to load checking accounts')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function loadSavingsAccounts() {
    try {
      setLoading(true)
      const response = await fetch('/api/v1/savings', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      })
      if (response.ok) {
        setAllSavingsAccounts(await response.json())
      }
    } catch (err) {
      setError('Failed to load savings accounts')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateAccount(customerId, accountType) {
    try {
      setError('')
      setSuccess('')
      const endpoint = accountType === 'checking' ? '/api/v1/checkings' : '/api/v1/savings'
      await postData(endpoint, { customer_id: customerId })
      setSuccess(`${accountType.charAt(0).toUpperCase() + accountType.slice(1)} account created successfully!`)
      if (accountType === 'checking') {
        loadCheckingAccounts()
      } else {
        loadSavingsAccounts()
      }
      loadCustomers()
    } catch (err) {
      setError(err.message || 'Failed to create account')
      console.error(err)
    }
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  function renderContent() {
    if (loading) return <div className="page-content"><p>Loading...</p></div>

    switch (activePage) {
      case 'customers':
        return (
          <div className="page-content">
            <h2>Customers</h2>
            {customers.length === 0 ? (
              <p>No customers found</p>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>{customer.first_name} {customer.last_name}</td>
                        <td>{customer.username}</td>
                        <td>{customer.email}</td>
                        <td>
                          <button
                            onClick={() => handleCreateAccount(customer.id, 'checking')}
                            className="action-button small"
                            title="Create Checking Account"
                          >
                            + Checking
                          </button>
                          <button
                            onClick={() => handleCreateAccount(customer.id, 'savings')}
                            className="action-button edit small"
                            title="Create Savings Account"
                          >
                            + Savings
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )

      case 'employees':
        return (
          <div className="page-content">
            <h2>Employees</h2>
            {employees.length === 0 ? (
              <p>No employees found</p>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Hire Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.first_name} {employee.last_name}</td>
                        <td>{employee.username}</td>
                        <td>{employee.email}</td>
                        <td>{employee.hired_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )

      case 'checking':
        return (
          <div className="page-content">
            <h2>Checking Accounts</h2>
            {allCheckingAccounts.length === 0 ? (
              <p>No checking accounts found</p>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Account ID</th>
                      <th>Customer ID</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCheckingAccounts.map((account) => (
                      <tr key={account.id}>
                        <td>{account.id}</td>
                        <td>{account.customer_id}</td>
                        <td>${account.amount?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )

      case 'savings':
        return (
          <div className="page-content">
            <h2>Savings Accounts</h2>
            {allSavingsAccounts.length === 0 ? (
              <p>No savings accounts found</p>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Account ID</th>
                      <th>Customer ID</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSavingsAccounts.map((account) => (
                      <tr key={account.id}>
                        <td>{account.id}</td>
                        <td>{account.customer_id}</td>
                        <td>${account.amount?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )

      default:
        return (
          <div className="page-content">
            <h2>Welcome, {user?.first_name} {user?.last_name}</h2>
            <p>You are logged in as an Employee</p>
            <p>Select a section from the menu to manage customers, employees, and accounts</p>
          </div>
        )
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Employee Dashboard</h1>
          <p>Welcome, {user?.first_name} {user?.last_name}</p>
        </div>
        <button className="action-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="employee-dashboard-content">
        <nav className="dashboard-nav">
          <button
            onClick={() => setActivePage('customers')}
            className={`nav-button ${activePage === 'customers' ? 'active' : ''}`}
          >
            Customers
          </button>
          <button
            onClick={() => setActivePage('employees')}
            className={`nav-button ${activePage === 'employees' ? 'active' : ''}`}
          >
            Employees
          </button>
          <button
            onClick={() => setActivePage('checking')}
            className={`nav-button ${activePage === 'checking' ? 'active' : ''}`}
          >
            Checking Accounts
          </button>
          <button
            onClick={() => setActivePage('savings')}
            className={`nav-button ${activePage === 'savings' ? 'active' : ''}`}
          >
            Savings Accounts
          </button>
        </nav>

        <main className="page-main">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default EmployeeDashboard

