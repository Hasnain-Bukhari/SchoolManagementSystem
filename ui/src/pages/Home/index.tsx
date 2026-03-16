import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div>
      <h1 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Welcome</h1>
      <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
        School Management System – use the navigation to view Users or explore the app.
      </p>
      <Link to="/users" style={{ color: '#2563eb', fontWeight: 500 }}>
        Go to Users →
      </Link>
    </div>
  );
}
