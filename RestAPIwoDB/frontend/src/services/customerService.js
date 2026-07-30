import { fetchData, postData, putData, deleteData } from './api'

const fallbackCustomers = [
  { id: 1, name: 'Aiden Nolan', email: 'aiden@example.com', accountType: 'Checking' },
  { id: 2, name: 'Maya Brooks', email: 'maya@example.com', accountType: 'Savings' },
]

export async function getCustomers() {
  return fetchData('/api/v1/customers', fallbackCustomers)
}

export async function addCustomer(data) {
  return postData('/api/v1/customers', data)
}

export async function updateCustomer(id, data) {
  return putData(`/api/v1/customers/${id}`, data)
}

export async function deleteCustomer(id) {
  return deleteData(`/api/v1/customers/${id}`)
}
