import { fetchData, postData, putData, deleteData } from './api'

const fallbackEmployees = [
  { id: 1, name: 'Jordan Lee', role: 'Branch Manager', department: 'Operations' },
  { id: 2, name: 'Priya Shah', role: 'Loan Officer', department: 'Finance' },
]

export async function getEmployees() {
  return fetchData('/api/v1/employees', fallbackEmployees)
}

export async function addEmployee(data) {
  return postData('/api/v1/employees', data)
}

export async function updateEmployee(id, data) {
  return putData(`/api/v1/employees/${id}`, data)
}

export async function deleteEmployee(id) {
  return deleteData(`/api/v1/employees/${id}`)
}
