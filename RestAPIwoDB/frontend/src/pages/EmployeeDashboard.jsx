import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { postData, putData, deleteData } from '../services/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

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

  // accountMenu: id of customer whose dropdown is open, or null
  const [accountMenu, setAccountMenu] = useState(null)

  // edit modal state
  const [editTarget, setEditTarget] = useState(null)   // { type, item }
  const [editForm, setEditForm] = useState({})

  useEffect(() => {
    if (!user || userType !== 'employee') {
      navigate('/')
    }
  }, [user, userType, navigate])

  useEffect(() => {
    if (activePage === 'customers') loadCustomers()
    else if (activePage === 'employees') loadEmployees()
    else if (activePage === 'checking') loadCheckingAccounts()
    else if (activePage === 'savings') loadSavingsAccounts()
  }, [activePage])

  async function authFetch(path) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    })
    return res
  }

  async function loadCustomers() {
    try {
      setLoading(true)
      const res = await authFetch('/api/v1/customers')
      if (res.ok) setCustomers(await res.json())
    } catch (err) { setError('Failed to load customers'); console.error(err) }
    finally { setLoading(false) }
  }

  async function loadEmployees() {
    try {
      setLoading(true)
      const res = await authFetch('/api/v1/employees')
      if (res.ok) setEmployees(await res.json())
    } catch (err) { setError('Failed to load employees'); console.error(err) }
    finally { setLoading(false) }
  }

  async function loadCheckingAccounts() {
    try {
      setLoading(true)
      const res = await authFetch('/api/v1/checkings')
      if (res.ok) setAllCheckingAccounts(await res.json())
    } catch (err) { setError('Failed to load checking accounts'); console.error(err) }
    finally { setLoading(false) }
  }

  async function loadSavingsAccounts() {
    try {
      setLoading(true)
      const res = await authFetch('/api/v1/savings')
      if (res.ok) setAllSavingsAccounts(await res.json())
    } catch (err) { setError('Failed to load savings accounts'); console.error(err) }
    finally { setLoading(false) }
  }

  async function handleCreateAccount(customerId, accountType) {
    try {
      setError(''); setSuccess('')
      await postData(`/api/v1/${accountType}s`, { customer_id: customerId })
      setSuccess(`${accountType.charAt(0).toUpperCase() + accountType.slice(1)} account created!`)
      setAccountMenu(null)
      accountType === 'checking' ? loadCheckingAccounts() : loadSavingsAccounts()
    } catch (err) { setError(err.message || 'Failed to create account'); console.error(err) }
  }

  async function handleDelete(type, id) {
    if (!confirm(`Delete this ${type}?`)) return
    try {
      setError(''); setSuccess('')
      await deleteData(`/api/v1/${type}/${id}`)
      setSuccess(`Deleted successfully`)
      if (type === 'customers') loadCustomers()
      else if (type === 'employees') loadEmployees()
      else if (type === 'checkings') loadCheckingAccounts()
      else if (type === 'savings') loadSavingsAccounts()
    } catch (err) { setError(err.message || 'Delete failed'); console.error(err) }
  }

  function openEdit(type, item) {
    setEditTarget({ type, item })
    setEditForm({ ...item })
  }

  async function handleEditSave() {
    const { type, item } = editTarget
    try {
      setError(''); setSuccess('')
      await putData(`/api/v1/${type}/${item.id}`, editForm)
      setSuccess('Updated successfully')
      setEditTarget(null)
      if (type === 'customers') loadCustomers()
      else if (type === 'employees') loadEmployees()
      else if (type === 'checkings') loadCheckingAccounts()
      else if (type === 'savings') loadSavingsAccounts()
    } catch (err) { setError(err.message || 'Update failed'); console.error(err) }
  }

  function handleLogout() { logout(); navigate('/') }

  function renderEditModal() {
    if (!editTarget) return null
    const { type, item } = editTarget
    const fields = Object.keys(editForm).filter(k => k !== 'id' && k !== 'customer_id')
    return (
      <div className="modal-overlay" onClick={() => setEditTarget(null)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <h3>Edit {type.slice(0, -1)}</h3>
          {fields.map(key => (
            <label key={key}>
              {key.replace(/_/g, ' ')}
              <input
                type={key === 'password' ? 'password' : 'text'}
                value={editForm[key] || ''}
                onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
              />
            </label>
          ))}
          <div className="modal-actions">
            <button onClick={handleEditSave} className="action-button edit">Save</button>
            <button onClick={() => setEditTarget(null)} className="action-button">Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  function renderContent() {
    if (loading) return <div className="page-content"><p>Loading...</p></div>

    switch (activePage) {
      case 'customers':
        return (
          <div className="page-content">
            <h2>Customers</h2>
            {customers.length === 0 ? <p>No customers found</p> : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th><th>Username</th><th>Email</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map(customer => (
                      <tr key={customer.id}>
                        <td>{customer.first_name} {customer.last_name}</td>
                        <td>{customer.username}</td>
                        <td>{customer.email}</td>
                        <td className="action-cell">
                          <div className="account-menu-wrapper">
                            <button
                              onClick={() => setAccountMenu(accountMenu === customer.id ? null : customer.id)}
                              className="action-button edit small"
                            >
                              + Account
                            </button>
                            {accountMenu === customer.id && (
                              <div className="dropdown-menu">
                                <button onClick={() => handleCreateAccount(customer.id, 'checking')}>Checking</button>
                                <button onClick={() => handleCreateAccount(customer.id, 'savings')}>Savings</button>
                              </div>
                            )}
                          </div>
                          <button onClick={() => openEdit('customers', customer)} className="action-button edit small">Edit</button>
                          <button onClick={() => handleDelete('customers', customer.id)} className="action-button small delete">Delete</button>
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
            {employees.length === 0 ? <p>No employees found</p> : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th><th>Username</th><th>Email</th><th>Hire Date</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(employee => (
                      <tr key={employee.id}>
                        <td>{employee.first_name} {employee.last_name}</td>
                        <td>{employee.username}</td>
                        <td>{employee.email}</td>
                        <td>{employee.hired_date}</td>
                        <td className="action-cell">
                          <button onClick={() => openEdit('employees', employee)} className="action-button edit small">Edit</button>
                          <button onClick={() => handleDelete('employees', employee.id)} className="action-button small delete">Delete</button>
                        </td>
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
            {allCheckingAccounts.length === 0 ? <p>No checking accounts found</p> : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Account ID</th><th>Customer ID</th><th>Balance</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCheckingAccounts.map(account => (
                      <tr key={account.id}>
                        <td>{account.id}</td>
                        <td>{account.customer_id}</td>
                        <td>${account.amount?.toFixed(2)}</td>
                        <td className="action-cell">
                          <button onClick={() => openEdit('checkings', account)} className="action-button edit small">Edit</button>
                          <button onClick={() => handleDelete('checkings', account.id)} className="action-button small delete">Delete</button>
                        </td>
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
            {allSavingsAccounts.length === 0 ? <p>No savings accounts found</p> : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Account ID</th><th>Customer ID</th><th>Balance</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSavingsAccounts.map(account => (
                      <tr key={account.id}>
                        <td>{account.id}</td>
                        <td>{account.customer_id}</td>
                        <td>${account.amount?.toFixed(2)}</td>
                        <td className="action-cell">
                          <button onClick={() => openEdit('savings', account)} className="action-button edit small">Edit</button>
                          <button onClick={() => handleDelete('savings', account.id)} className="action-button small delete">Delete</button>
                        </td>
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
          <button onClick={() => setActivePage('customers')} className={`nav-button ${activePage === 'customers' ? 'active' : ''}`}>Customers</button>
          <button onClick={() => setActivePage('employees')} className={`nav-button ${activePage === 'employees' ? 'active' : ''}`}>Employees</button>
          <button onClick={() => setActivePage('checking')} className={`nav-button ${activePage === 'checking' ? 'active' : ''}`}>Checking Accounts</button>
          <button onClick={() => setActivePage('savings')} className={`nav-button ${activePage === 'savings' ? 'active' : ''}`}>Savings Accounts</button>
        </nav>

        <main className="page-main">
          {renderContent()}
        </main>
      </div>

      {renderEditModal()}
    </div>
  )
}

export default EmployeeDashboard
