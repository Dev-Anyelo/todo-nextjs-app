import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo app built with Next.js and Prisma.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`px-3 ${inter.className}`}>
        <div className='max-w-[1400px] mx-auto'>
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
