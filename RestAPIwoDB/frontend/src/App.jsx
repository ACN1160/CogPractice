import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { useContext } from 'react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CustomersPage from './pages/CustomersPage'
import EmployeesPage from './pages/EmployeesPage'
import AuthHomePage from './pages/AuthHomePage'
import CustomerDashboard from './pages/CustomerDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import AccountsAdminPage from './pages/AccountsAdminPage'
import './App.css'

function AppContent() {
  const { user, userType } = useContext(AuthContext)

  // If user is logged in, show dashboards
  if (user) {
    return (
      <Routes>
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/customers-admin" element={<CustomersPage />} />
        <Route path="/employees-admin" element={<EmployeesPage />} />
        <Route path="/accounts-admin" element={<AccountsAdminPage />} />
        <Route path="*" element={
          userType === 'customer' ? <Navigate to="/customer-dashboard" /> : <Navigate to="/employee-dashboard" />
        } />
      </Routes>
    )
  }

  // If not logged in, show auth page
  return (
    <Routes>
      <Route path="/" element={<AuthHomePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
