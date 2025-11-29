import './globals.css'; // Keep as first line. If there is an error on the import can be ignored
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Providers from '@/components/providers/Providers';
import { Box } from '@mui/material';
import TopBar from '@/components/ui/TopBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Tech Billing',
    default: 'Tech Billing',
  },
  description: "Tech Billing's website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required for next-themes
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Box className="flex flex-col w-screen h-screen items-center">
            <TopBar />
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
