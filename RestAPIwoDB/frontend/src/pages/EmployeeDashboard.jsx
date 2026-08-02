import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { postData } from '../services/api'

function EmployeeDashboard() {
  const { user, userType, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('home')
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [accountType, setAccountType] = useState('checking')
  const [loadingCustomers, setLoadingCustomers] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!user || userType !== 'employee') {
      navigate('/')
    }
  }, [user, userType, navigate])

  useEffect(() => {
    if (activePage === 'create-accounts') {
      loadCustomers()
    }
  }, [activePage])

  async function loadCustomers() {
    try {
      setLoadingCustomers(true)
      const response = await fetch('/api/v1/customers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      })
      if (response.ok) {
        const data = await response.json()
        setCustomers(data)
      }
    } catch (err) {
      setError('Failed to load customers')
      console.error(err)
    } finally {
      setLoadingCustomers(false)
    }
  }

  async function handleCreateAccount() {
    if (!selectedCustomer) {
      setError('Please select a customer')
      return
    }

    try {
      setError('')
      setSuccess('')
      const endpoint = accountType === 'checking' ? '/api/v1/checkings' : '/api/v1/savings'
      await postData(endpoint, { customer_id: selectedCustomer })
      setSuccess(`${accountType.charAt(0).toUpperCase() + accountType.slice(1)} account created successfully!`)
      setSelectedCustomer('')
      setAccountType('checking')
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
    switch (activePage) {
      case 'customers':
        return (
          <div className="page-content">
            <h2>Customer Management</h2>
            <p>View and manage all customers in the system</p>
            <button onClick={() => navigate('/customers-admin')} className="action-button edit">
              Go to Customers
            </button>
          </div>
        )
      case 'employees':
        return (
          <div className="page-content">
            <h2>Employee Management</h2>
            <p>View and manage all employees in the system</p>
            <button onClick={() => navigate('/employees-admin')} className="action-button edit">
              Go to Employees
            </button>
          </div>
        )
      case 'savings':
        return (
          <div className="page-content">
            <h2>Savings Accounts</h2>
            <p>View and manage all savings accounts in the system</p>
            <button onClick={() => navigate('/accounts-admin?type=savings')} className="action-button edit">
              Go to Savings Accounts
            </button>
          </div>
        )
      case 'checking':
        return (
          <div className="page-content">
            <h2>Checking Accounts</h2>
            <p>View and manage all checking accounts in the system</p>
            <button onClick={() => navigate('/accounts-admin?type=checking')} className="action-button edit">
              Go to Checking Accounts
            </button>
          </div>
        )
      case 'create-accounts':
        return (
          <div className="page-content">
            <h2>Create Customer Account</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            {loadingCustomers ? (
              <p>Loading customers...</p>
            ) : (
              <div className="form-group">
                <label>
                  Select Customer:
                  <select
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                  >
                    <option value="">-- Choose a customer --</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.first_name} {customer.last_name} ({customer.username})
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Account Type:
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  >
                    <option value="checking">Checking Account</option>
                    <option value="savings">Savings Account</option>
                  </select>
                </label>

                <button onClick={handleCreateAccount} className="action-button edit">
                  Create Account
                </button>
              </div>
            )}
          </div>
        )
      default:
        return (
          <div className="page-content">
            <h2>Welcome, {user?.first_name} {user?.last_name}</h2>
            <p>You are logged in as an Employee</p>
            <p>Select a management option from the menu below:</p>
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

      <div className="employee-dashboard-content">
        <nav className="dashboard-nav">
          <button
            onClick={() => setActivePage('home')}
            className={`nav-button ${activePage === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => setActivePage('create-accounts')}
            className={`nav-button ${activePage === 'create-accounts' ? 'active' : ''}`}
          >
            Create Accounts
          </button>
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
            onClick={() => setActivePage('savings')}
            className={`nav-button ${activePage === 'savings' ? 'active' : ''}`}
          >
            Savings Accounts
          </button>
          <button
            onClick={() => setActivePage('checking')}
            className={`nav-button ${activePage === 'checking' ? 'active' : ''}`}
          >
            Checking Accounts
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
