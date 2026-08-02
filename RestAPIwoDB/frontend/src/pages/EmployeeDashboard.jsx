import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function EmployeeDashboard() {
  const { user, userType, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('home') // 'home', 'customers', 'employees', 'savings', 'checking'

  useEffect(() => {
    if (!user || userType !== 'employee') {
      navigate('/')
    }
  }, [user, userType, navigate])

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
