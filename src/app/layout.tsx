import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar/Navbar.component'

export const metadata: Metadata = {
  title: 'Smite Meta',
  description: 'Making Smite at least a little less frustrating'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        </body>
    </html>
  )
}
