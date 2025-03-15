import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OnSkip - Custom Business Solutions',
  description: 'Custom software solutions for Construction, Live Stock, Online Business, Healthcare, and Fintech industries.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed top-0 left-0 w-full z-30 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="text-white text-2xl font-bold">OnSkip</div>
              <div className="hidden md:flex space-x-8">
                <a href="#services" className="text-white hover:text-blue-400 transition-colors">Services</a>
                <a href="#industries" className="text-white hover:text-blue-400 transition-colors">Industries</a>
                <a href="#about" className="text-white hover:text-blue-400 transition-colors">About</a>
                <a href="#contact" className="text-white hover:text-blue-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
} 