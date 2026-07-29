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
