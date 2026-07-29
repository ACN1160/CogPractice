import { fetchData } from './api'

const fallbackEmployees = [
  { id: 1, name: 'Jordan Lee', role: 'Branch Manager', department: 'Operations' },
  { id: 2, name: 'Priya Shah', role: 'Loan Officer', department: 'Finance' },
]

export async function getEmployees() {
  return fetchData('/api/v1/employees', fallbackEmployees)
}
