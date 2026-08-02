import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) } catch { return null }
  })
  const [userType, setUserType] = useState(() => localStorage.getItem('userType'))
  const [token, setToken] = useState(() => localStorage.getItem('access_token'))

  const login = (userData, type) => {
    const { access_token, ...rest } = userData
    setUser(rest)
    setUserType(type)
    setToken(access_token)
    localStorage.setItem('user', JSON.stringify(rest))
    localStorage.setItem('userType', type)
    localStorage.setItem('access_token', access_token)
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('userType')
    localStorage.removeItem('access_token')
  }

  return (
    <AuthContext.Provider value={{ user, userType, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
