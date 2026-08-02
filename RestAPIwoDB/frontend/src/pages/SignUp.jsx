import { useState } from 'react'
import { postData } from '../services/api'

function SignUp({ onSwitchToLogin }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSignUp(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await postData('/api/v1/customers', form)

      setSuccess('Account created successfully! You can now login.')
      setForm({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
      })

      // Switch to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin()
      }, 2000)
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        setError('Cannot reach the server. Make sure the backend is running.')
      } else if (err.message.toLowerCase().includes('duplicate') || err.message.includes('11000')) {
        setError('Username or email already exists. Please choose different values.')
      } else {
        setError(`Failed to create account: ${err.message}`)
      }
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      <form onSubmit={handleSignUp} className="auth-form">
        <label>
          Username
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" disabled={loading} className="action-button edit">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      <p className="auth-switch">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="link-button">
          Login
        </button>
      </p>
    </div>
  )
}

export default SignUp
