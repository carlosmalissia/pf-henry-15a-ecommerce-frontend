
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/Components/Navbar/Navbar'
import Footer from '@/Components/Footer/Footer'
import { Providers } from '@/redux/providers'
import { NextAuthProvider } from './providers'


const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Henrucci',
  description: 'Generated by grupo 03 pf-henry',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
    <body className={inter.className}>
      <NextAuthProvider>
      <Providers>
        <Navbar />
          {children}
        <footer className="bg-bgfooter p-10">
          <Footer />
        </footer> 
      </Providers>
      </NextAuthProvider>
       
    </body>
  </html>
  )
}
