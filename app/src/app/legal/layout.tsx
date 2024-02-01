import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'yolofail: legal',
  description: 'please yeet responsibly',
  keywords: ['yolofail', 'terms'],
};

const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  
  return (
    <>
      {children}
    </>
  );
};

export default Layout;
