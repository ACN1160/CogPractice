import { fetchData } from './api'

const fallbackCustomers = [
  { id: 1, name: 'Aiden Nolan', email: 'aiden@example.com', accountType: 'Checking' },
  { id: 2, name: 'Maya Brooks', email: 'maya@example.com', accountType: 'Savings' },
]

export async function getCustomers() {
  return fetchData('/api/v1/customers', fallbackCustomers)
}
