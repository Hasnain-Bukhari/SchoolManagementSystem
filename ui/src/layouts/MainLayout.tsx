import { Outlet, Link } from 'react-router-dom';

export function MainLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          background: '#1e293b',
          color: '#fff',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <Link to="/" style={{ color: 'inherit', fontWeight: 700, fontSize: '1.25rem' }}>
          School Management
        </Link>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ color: 'inherit', opacity: 0.9 }}>
            Home
          </Link>
          <Link to="/users" style={{ color: 'inherit', opacity: 0.9 }}>
            Users
          </Link>
        </nav>
      </header>
      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
