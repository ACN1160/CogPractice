import { postData, fetchData, deleteData } from './api'

export async function getCheckingAccounts(customerId) {
  return fetchData(`/api/v1/checkings?customer_id=${customerId}`, [])
}

export async function getSavingsAccounts(customerId) {
  return fetchData(`/api/v1/savings?customer_id=${customerId}`, [])
}

export async function addCheckingAccount(data) {
  return postData('/api/v1/checkings', data)
}

export async function addSavingsAccount(data) {
  return postData('/api/v1/savings', data)
}

export async function deleteCheckingAccount(id) {
  return deleteData(`/api/v1/checkings/${id}`)
}

export async function deleteSavingsAccount(id) {
  return deleteData(`/api/v1/savings/${id}`)
}

export async function withdrawFromAccount(accountId, amount, accountType) {
  const endpoint = accountType === 'checking' ? `/api/v1/checkings/${accountId}/withdraw` : `/api/v1/savings/${accountId}/withdraw`
  return postData(endpoint, { amount })
}

export async function depositToAccount(accountId, amount, accountType) {
  const endpoint = accountType === 'checking' ? `/api/v1/checkings/${accountId}/deposit` : `/api/v1/savings/${accountId}/deposit`
  return postData(endpoint, { amount })
}
