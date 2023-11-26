import type { Metadata } from 'next';
import Link from 'next/link';
import { FeedbackForm } from './components/feedback-form';
import '@/styles/globals.css';

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
      <body>
        {children}
        <footer className="flex flex-row justify-center space-x-4">
          <Link href="/legal" className="underline-offset-4 hover:underline">
            {'legal'}
          </Link>
          <FeedbackForm />
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
