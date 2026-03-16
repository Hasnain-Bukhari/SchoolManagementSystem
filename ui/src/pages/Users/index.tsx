import { useEffect, useState } from 'react';
import { usersService } from '../../services/users.service';
import type { User } from '../../types/user';

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    usersService
      .getUsers()
      .then((data) => {
        if (!cancelled) setUsers(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load users');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p>Loading users…</p>;
  }

  if (error) {
    return (
      <div style={{ color: '#dc2626' }}>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: '1rem', fontSize: '1.75rem' }}>Users</h1>
      {users.length === 0 ? (
        <p style={{ color: '#64748b' }}>No users yet. Create some via the API.</p>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                padding: '1rem 1.25rem',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              }}
            >
              <strong>
                {user.firstName} {user.lastName}
              </strong>
              <span style={{ color: '#64748b', marginLeft: '0.5rem' }}>
                {user.email}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
