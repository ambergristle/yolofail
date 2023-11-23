import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'yolofail',
  description: 'rip your retirement',
  keywords: [
    "yolofail",
    "stock",
    "asset",
    "index",
    "gains",
    "yeet",
    "wallstreetbets",
  ]
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  
  return (
    <html lang="en">
      <body>
        {children}
        <footer>
          hello
        </footer>
      </body>
    </html>
  )
}

export default RootLayout