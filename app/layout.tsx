import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Sidebar from '../components/sidebar'; // adjust path as needed

export const metadata = {
  title: 'Job Management Admin Panel',
  description: 'Manage jobs, candidates, and companies',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: 20 }}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <Notifications />
            {children}
          </MantineProvider>
        </main>
      </body>
    </html>
  );
}
