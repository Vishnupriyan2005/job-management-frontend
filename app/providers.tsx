// app/providers.tsx
'use client';

import '@mantine/core/styles.css'; // ✅ This line is required in Mantine v7
import { MantineProvider } from '@mantine/core';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}
