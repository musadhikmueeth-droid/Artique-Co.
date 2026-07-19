import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Artique Co.',
  description: 'Minimalist luxury — curated for the discerning.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0f172a] text-white">
        <Navbar />
        <main className="pt-28 px-4 max-w-6xl mx-auto pb-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
