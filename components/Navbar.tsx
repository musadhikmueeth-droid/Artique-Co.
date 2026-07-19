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
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="max-w-5xl mx-auto glass-dark px-5 py-3 flex items-center justify-between">
        <Link href="/" className="luxury-text text-lg font-bold text-white tracking-widest hover:text-[#94a3b8] transition-colors">
          ARTIQUE<span className="text-[#475569]">.</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 ${
                pathname === href
                  ? 'bg-[#94a3b8]/15 text-white border border-[#94a3b8]/20'
                  : 'text-[#64748b] hover:text-[#94a3b8] hover:bg-white/[0.04]'
              }`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline uppercase tracking-wider">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
