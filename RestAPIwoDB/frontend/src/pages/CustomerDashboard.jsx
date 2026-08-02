import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { postData, putData } from '../services/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

function CustomerDashboard() {
  const { user, userType, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [savingsAccounts, setSavingsAccounts] = useState([])
  const [checkingAccounts, setCheckingAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [transactionAmounts, setTransactionAmounts] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!user || userType !== 'customer') {
      navigate('/')
      return
    }
    loadAccounts()
  }, [user, userType, navigate])

  async function loadAccounts() {
    try {
      setLoading(true)
      setError('')
      console.log('Loading accounts for user ID:', user.id)
      const token = localStorage.getItem('access_token')
      console.log('Token available:', !!token)

      const savingsRes = await fetch(`${API_BASE_URL}/api/v1/savings/customer/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('Savings response status:', savingsRes.status)
      const checkingRes = await fetch(`${API_BASE_URL}/api/v1/checkings/customer/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('Checking response status:', checkingRes.status)

      if (savingsRes.ok) {
        const savingsData = await savingsRes.json()
        console.log('Savings data:', savingsData)
        setSavingsAccounts(savingsData)
      } else if (savingsRes.status === 404) {
        console.log('No savings accounts found (404)')
        setSavingsAccounts([])
      } else {
        console.error('Savings error:', savingsRes.status)
      }

      if (checkingRes.ok) {
        const checkingData = await checkingRes.json()
        console.log('Checking data:', checkingData)
        setCheckingAccounts(checkingData)
      } else if (checkingRes.status === 404) {
        console.log('No checking accounts found (404)')
        setCheckingAccounts([])
      } else {
        console.error('Checking error:', checkingRes.status)
      }
    } catch (err) {
      setError('Failed to load accounts')
      console.error('Error loading accounts:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleTransaction(accountId, amount, type, accountType) {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setError('')
      setSuccess('')
      const endpoint = `/api/v1/${accountType}s/${accountId}/${type}`
      const response = await postData(endpoint, { amount: parseFloat(amount) })
      setSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} of $${amount} successful!`)
      setTransactionAmounts({ ...transactionAmounts, [accountId]: '' })
      await loadAccounts()
    } catch (err) {
      setError(err.message || 'Transaction failed')
      console.error(err)
    }
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>Welcome, {user?.first_name} {user?.last_name}</h1>
          <p>Customer Dashboard</p>
        </div>
        <button className="action-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="accounts-section">
        <h2>Your Accounts</h2>

        <div className="accounts-grid">
          {savingsAccounts.length > 0 && (
            <div>
              <h3>Savings Accounts ({savingsAccounts.length})</h3>
              {savingsAccounts.map((account) => (
                <div key={account.id} className="account-card">
                  <p>Account ID: {account.id}</p>
                  <p>Balance: ${account.amount?.toFixed(2)}</p>
                  <div className="transaction-form">
                    <input
                      type="number"
                      placeholder="Amount"
                      value={transactionAmounts[account.id] || ''}
                      onChange={(e) => setTransactionAmounts({ ...transactionAmounts, [account.id]: e.target.value })}
                      step="0.01"
                      min="0"
                    />
                    <button
                      onClick={() => handleTransaction(account.id, transactionAmounts[account.id], 'withdraw', 'savings')}
                      className="action-button"
                    >
                      Withdraw
                    </button>
                    <button
                      onClick={() => handleTransaction(account.id, transactionAmounts[account.id], 'deposit', 'savings')}
                      className="action-button edit"
                    >
                      Deposit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {checkingAccounts.length > 0 && (
            <div>
              <h3>Checking Accounts ({checkingAccounts.length})</h3>
              {checkingAccounts.map((account) => (
                <div key={account.id} className="account-card">
                  <p>Account ID: {account.id}</p>
                  <p>Balance: ${account.amount?.toFixed(2)}</p>
                  <div className="transaction-form">
                    <input
                      type="number"
                      placeholder="Amount"
                      value={transactionAmounts[account.id] || ''}
                      onChange={(e) => setTransactionAmounts({ ...transactionAmounts, [account.id]: e.target.value })}
                      step="0.01"
                      min="0"
                    />
                    <button
                      onClick={() => handleTransaction(account.id, transactionAmounts[account.id], 'withdraw', 'checking')}
                      className="action-button"
                    >
                      Withdraw
                    </button>
                    <button
                      onClick={() => handleTransaction(account.id, transactionAmounts[account.id], 'deposit', 'checking')}
                      className="action-button edit"
                    >
                      Deposit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {savingsAccounts.length === 0 && checkingAccounts.length === 0 && (
          <p className="info-text">No accounts yet. Contact an employee to create one.</p>
        )}
      </div>
    </div>
  )
}

export default CustomerDashboard

