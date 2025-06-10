'use client';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Sidebar from '../components/sidebar';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider defaultColorScheme="light">
          <Notifications />
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, padding: 20 }}>{children}</main>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
