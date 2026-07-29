import { useState } from 'react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CustomersPage from './pages/CustomersPage'
import EmployeesPage from './pages/EmployeesPage'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'customers':
        return <CustomersPage />
      case 'employees':
        return <EmployeesPage />
      case 'home':
      default:
        return <HomePage />
    }
  }

  const pageTitle = {
    home: 'Banking Dashboard',
    customers: 'Customer Records',
    employees: 'Employee Directory',
  }[activeTab]

  return (
    <Layout title={pageTitle} activeTab={activeTab} onTabChange={setActiveTab}>
      {renderPage()}
    </Layout>
  )
}

export default App
