import type { Metadata } from 'next';
import Link from 'next/link';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'yolofail',
  description: 'rip your retirement',
  keywords: [
    'yolofail',
    'stock',
    'asset',
    'index',
    'gains',
    'yeet',
    'wallstreetbets',
  ],
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  
  return (
    <html lang="en">
      <body className="container min-h-screen max-w-5xl">
        {children}
        <footer className="mt-4 flex flex-row justify-center space-x-4 py-4">
          <Link href="/" className="text-muted-foreground underline-offset-4 hover:underline">
            {'search'}
          </Link>
          <span>
            |
          </span>
          <Link href="/legal" className="text-muted-foreground underline-offset-4 hover:underline">
            {'legal'}
          </Link>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;