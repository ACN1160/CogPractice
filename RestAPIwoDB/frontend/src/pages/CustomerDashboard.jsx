import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { getCustomers } from '../services/customerService'

function CustomerDashboard() {
  const { user, userType, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [savingsAccounts, setSavingsAccounts] = useState([])
  const [checkingAccounts, setCheckingAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [transactionAmount, setTransactionAmount] = useState('')
  const [transactionType, setTransactionType] = useState('deposit')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user || userType !== 'customer') {
      navigate('/')
      return
    }
    loadAccounts()
  }, [user, userType, navigate])

  async function loadAccounts() {
    try {
      // For now, this is a placeholder. You'll need to implement 
      // proper account fetching for a specific customer
      setLoading(false)
    } catch (err) {
      setError('Failed to load accounts')
      console.error(err)
      setLoading(false)
    }
  }

  async function handleTransaction(accountId, amount, type, accountType) {
    try {
      // API call would go here
      // await withdrawFromAccount(accountId, amount, accountType) or depositToAccount...
      alert(`${type} of $${amount} successful!`)
      await loadAccounts()
    } catch (err) {
      setError('Transaction failed')
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

      <div className="accounts-section">
        <h2>Your Accounts</h2>
        
        <div className="accounts-grid">
          {savingsAccounts.length > 0 && (
            <div className="account-card">
              <h3>Savings Account</h3>
              {savingsAccounts.map(account => (
                <div key={account.id}>
                  <p>Balance: ${account.balance}</p>
                  <div className="transaction-form">
                    <input
                      type="number"
                      placeholder="Amount"
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                    />
                    <button onClick={() => handleTransaction(account.id, transactionAmount, 'Withdraw', 'savings')} className="action-button">
                      Withdraw
                    </button>
                    <button onClick={() => handleTransaction(account.id, transactionAmount, 'Deposit', 'savings')} className="action-button edit">
                      Deposit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {checkingAccounts.length > 0 && (
            <div className="account-card">
              <h3>Checking Account</h3>
              {checkingAccounts.map(account => (
                <div key={account.id}>
                  <p>Balance: ${account.balance}</p>
                  <div className="transaction-form">
                    <input
                      type="number"
                      placeholder="Amount"
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                    />
                    <button onClick={() => handleTransaction(account.id, transactionAmount, 'Withdraw', 'checking')} className="action-button">
                      Withdraw
                    </button>
                    <button onClick={() => handleTransaction(account.id, transactionAmount, 'Deposit', 'checking')} className="action-button edit">
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
