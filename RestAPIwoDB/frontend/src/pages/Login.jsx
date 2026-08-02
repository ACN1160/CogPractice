import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { postLogin } from '../services/api'

function Login({ onSwitchToSignup }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data: customerData, status: cusStatus } = await postLogin('/api/v1/customers/login', { username, password })
      if (customerData) {
        login(customerData, 'customer')
        navigate('/customer-dashboard')
        return
      }

      const { data: employeeData, status: empStatus } = await postLogin('/api/v1/employees/login', { username, password })
      if (employeeData) {
        login(employeeData, 'employee')
        navigate('/employee-dashboard')
        return
      }

      // Both returned 401
      if (cusStatus === 401 || empStatus === 401) {
        setError('Invalid username or password')
      } else {
        setError(`Login failed (status ${cusStatus}). Is the backend running?`)
      }
    } catch (err) {
      // Network error — backend unreachable
      setError('Cannot reach the server. Make sure the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading} className="action-button edit">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="auth-switch">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitchToSignup} className="link-button">
          Create one
        </button>
      </p>
    </div>
  )
}

export default Login
