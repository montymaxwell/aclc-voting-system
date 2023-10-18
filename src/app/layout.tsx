import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ACLC Voting System',
  description: 'a simple voting system',
  icons: {
    icon: './favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='w-full h-full'>
      <body className={inter.className + ' w-full h-full'}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        {children}
      </body>
    </html>
  )
}
