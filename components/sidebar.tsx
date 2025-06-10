import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside style={{ width: 250, padding: 20, backgroundColor: '#f0f0f0', height: '100vh' }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: 10 }}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li style={{ marginBottom: 10 }}>
            <Link href="/jobs">Jobs</Link>
          </li>
          <li style={{ marginBottom: 10 }}>
            <Link href="/companies">Companies</Link>
          </li>
          <li style={{ marginBottom: 10 }}>
            <Link href="/candidates">Candidates</Link>
          </li>
          {/* Removed Job Listings link */}
        </ul>
      </nav>
    </aside>
  );
}
