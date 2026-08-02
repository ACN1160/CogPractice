import { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'
import '../styles/Auth.css'

function AuthHomePage() {
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'

  return (
    <div className="auth-container">
      <div className="auth-header">
        <p className="eyebrow">Welcome to</p>
        <h1>Banking Portal</h1>
        <p>Manage your accounts securely</p>
      </div>
      
      <div className="auth-content">
        {authMode === 'login' ? (
          <Login onSwitchToSignup={() => setAuthMode('signup')} />
        ) : (
          <SignUp onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </div>
    </div>
  )
}

export default AuthHomePage
