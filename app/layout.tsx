import "./globals.css";
import { ColorSchemeScript } from "@mantine/core";
import { Providers } from "./providers";

export const metadata = {
  title: "Job Management Admin Panel",
  description: "Cybermind Works HR Assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
