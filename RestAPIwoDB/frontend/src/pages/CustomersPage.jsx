import { useEffect, useState } from 'react'
import { getCustomers } from '../services/customerService'

function CustomersPage() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    async function loadCustomers() {
      const data = await getCustomers()
      setCustomers(data)
    }

    loadCustomers()
  }, [])

  return (
    <section className="page-card">
      <div className="page-intro">
        <p className="eyebrow">Customers</p>
        <h2>Customer records</h2>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Account</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{`${customer.first_name || ''} ${customer.last_name || ''}`.trim()}</td>
                <td>{customer.email}</td>
                <td>{customer.id}</td>
                <td>
                  <div className="action-buttons">
                    <button type="button" className="action-button edit">
                      Edit
                    </button>
                    <button type="button" className="action-button delete">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CustomersPage
