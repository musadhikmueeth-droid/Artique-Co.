'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Settings, Store, Home } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/shop', label: 'Shop', icon: Store },
    { href: '/cart', label: 'Cart', icon: ShoppingCart },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark px-6 py-4 mx-4 mt-4 rounded-2xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-widest text-white">
          ARTIQUE<span className="text-[#94a3b8]">.</span>
        </Link>
        <div className="flex items-center gap-2">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === href
                  ? 'bg-[#94a3b8]/20 text-white'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
