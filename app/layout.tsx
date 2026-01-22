// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gurkhas Travel - Professional Flight Booking',
  description: 'Book your dream vacation with Gurkhas Travel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body className={`${inter.className} bg-gray-50`}>
          
            <Navbar />
            <main>{children}</main>
            <Footer />
          
        </body>
      </html>
    </ClerkProvider>
  );
}