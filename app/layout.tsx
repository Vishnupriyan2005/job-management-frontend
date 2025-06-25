// app/layout.tsx
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Job Management App',
  description: 'Manage job postings',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        {/* ✅ No withGlobalStyles / withNormalizeCSS */}
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
