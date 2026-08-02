const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export async function fetchData(endpoint, fallbackData) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.warn(`Falling back to sample data for ${endpoint}:`, error)
    return fallbackData
  }
}

export async function postData(endpoint, body) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    let msg = `Request failed with status ${response.status}`
    try { const errBody = await response.json(); msg = errBody.error || errBody.message || msg } catch {}
    throw new Error(msg)
  }
  return response.json()
}

// Returns { data, status } without throwing on 4xx so callers can check status
export async function postLogin(endpoint, body) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = response.ok ? await response.json() : null
  return { data, status: response.status }
}

export async function putData(endpoint, body) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return response.json()
}

export async function deleteData(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
}
