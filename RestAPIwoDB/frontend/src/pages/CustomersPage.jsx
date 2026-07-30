import { useEffect, useState } from 'react'
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../services/customerService'

const EMPTY_FORM = { first_name: '', last_name: '', email: '' }

function CustomerModal({ customer, onClose, onSave }) {
  const [form, setForm] = useState(customer ? { first_name: customer.first_name, last_name: customer.last_name, email: customer.email } : EMPTY_FORM)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await onSave(form)
      onClose()
    } catch (err) {
      setError(err.message || 'An error occurred')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>{customer ? 'Edit Customer' : 'Add Customer'}</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            First Name
            <input name="first_name" value={form.first_name} onChange={handleChange} required />
          </label>
          <label>
            Last Name
            <input name="last_name" value={form.last_name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          {error && <p className="modal-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="action-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="action-button edit">{customer ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [modalCustomer, setModalCustomer] = useState(undefined) // undefined = closed, null = add, object = edit
  const [error, setError] = useState('')

  async function loadCustomers() {
    const data = await getCustomers()
    setCustomers(data)
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  async function handleSave(form) {
    if (modalCustomer) {
      await updateCustomer(modalCustomer.id, form)
    } else {
      await addCustomer(form)
    }
    await loadCustomers()
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this customer?')) return
    try {
      await deleteCustomer(id)
      await loadCustomers()
    } catch (err) {
      setError(err.message || 'Delete failed')
    }
  }

  return (
    <section className="page-card">
      <div className="page-intro" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="eyebrow">Customers</p>
          <h2>Customer records</h2>
        </div>
        <button type="button" className="action-button edit" onClick={() => setModalCustomer(null)}>
          + Add Customer
        </button>
      </div>

      {error && <p className="modal-error">{error}</p>}

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
                    <button type="button" className="action-button edit" onClick={() => setModalCustomer(customer)}>
                      Edit
                    </button>
                    <button type="button" className="action-button delete" onClick={() => handleDelete(customer.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalCustomer !== undefined && (
        <CustomerModal
          customer={modalCustomer}
          onClose={() => setModalCustomer(undefined)}
          onSave={handleSave}
        />
      )}
    </section>
  )
}

export default CustomersPage
