import { Toaster } from '@/common/_/ui/toaster';
import { cn } from '@/common/_/ui/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Header } from './_/header';
import { SessionProvider } from './_/session-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'dark bg-background')}>
        <SessionProvider>
          <Header />
          <main className="container">{children}</main>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
