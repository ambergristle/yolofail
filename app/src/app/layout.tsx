import type { Metadata } from 'next';
import Link from 'next/link';

import { BASE_URL } from '@/config';
import '../styles/globals.css';

// add favicon.ico at root
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

/**
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
 */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
  openGraph: {
    title: 'yolofail',
    description: 'rip your retirement',
    url: '/',
    images: '/api/og',
  },
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
