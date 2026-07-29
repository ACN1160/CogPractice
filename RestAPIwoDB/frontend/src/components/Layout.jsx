function Layout({ title, activeTab, onTabChange, children }) {
  const tabs = [
    { key: 'home', label: 'Home' },
    { key: 'customers', label: 'Customers' },
    { key: 'employees', label: 'Employees' },
  ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">React front end</p>
          <h1>{title}</h1>
        </div>
        <nav className="tab-nav" aria-label="Primary navigation">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`tab-button${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => onTabChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <p>Simple banking portal built with React and Vite.</p>
      </footer>
    </div>
  )
}

export default Layout
