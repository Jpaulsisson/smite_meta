import './globals.css';
import type { Metadata } from 'next';
import UserContextProvider from '@/contexts/user.context';
import DataContextProvider from '@/contexts/data.context';
import Navbar from '@/components/Navbar/Navbar.component';
import { Quicksand } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Smite Meta',
  description: 'Making Smite a little less frustrating'
}

const font = Quicksand({
  weight: '300',
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={font.className} lang="en">
      <body id='app'>
        <UserContextProvider>
          <DataContextProvider>
            <Navbar />
            {children}
          </DataContextProvider>
        </UserContextProvider>
      </body> 
    </html>
  )
}
