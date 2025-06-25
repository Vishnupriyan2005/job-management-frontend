// app/layout.tsx
import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
