import { useEffect, useState, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { fetchData, deleteData } from '../services/api'

function AccountsAdminPage() {
  const { user, userType } = useContext(AuthContext)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const accountType = searchParams.get('type') || 'savings'
  
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (userType !== 'employee') {
      navigate('/employee-dashboard')
      return
    }
    loadAccounts()
  }, [accountType, userType, navigate])

  async function loadAccounts() {
    try {
      setLoading(true)
      const endpoint = accountType === 'savings' ? '/api/v1/savings' : '/api/v1/checkings'
      const data = await fetchData(endpoint, [])
      setAccounts(data)
    } catch (err) {
      setError('Failed to load accounts')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this account?')) return
    
    try {
      const endpoint = accountType === 'savings' ? `/api/v1/savings/${id}` : `/api/v1/checkings/${id}`
      await deleteData(endpoint)
      await loadAccounts()
    } catch (err) {
      setError('Failed to delete account')
      console.error(err)
    }
  }

  if (!user || userType !== 'employee') {
    return <div>Access Denied</div>
  }

  return (
    <section className="page-card">
      <div className="page-intro" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="eyebrow">Accounts</p>
          <h2>{accountType === 'savings' ? 'Savings' : 'Checking'} Accounts</h2>
        </div>
        <button className="action-button edit" onClick={() => navigate('/employee-dashboard')}>
          Back to Dashboard
        </button>
      </div>

      {error && <p className="modal-error">{error}</p>}
      {loading && <p>Loading accounts...</p>}

      {!loading && accounts.length === 0 && (
        <p className="info-text">No {accountType} accounts found.</p>
      )}

      {!loading && accounts.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Customer ID</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.customer_id || account.customerId || 'N/A'}</td>
                  <td>${account.balance || 0}</td>
                  <td>
                    <button
                      className="action-button"
                      onClick={() => handleDelete(account.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default AccountsAdminPage
