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
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <div className="max-w-5xl mx-auto glass-nav px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
            <polygon points="16,2 20,12 30,12 22,19 25,30 16,23 7,30 10,19 2,12 12,12" fill="none" stroke="url(#g1)" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="16" cy="16" r="4" fill="url(#g1)" opacity="0.8"/>
            <defs>
              <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c9a84c"/>
                <stop offset="100%" stopColor="#e8c97a"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="serif text-base font-bold text-white tracking-widest group-hover:gold-text transition-colors">ARTIQUE</span>
            <span className="text-[9px] text-[#c9a84c]/60 tracking-[0.4em] uppercase">Co.</span>
          </div>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 ${
                pathname === href
                  ? 'text-[#c9a84c] bg-[#c9a84c]/10 border border-[#c9a84c]/20'
                  : 'text-[#4b5563] hover:text-[#c9a84c] hover:bg-white/[0.03]'
              }`}
            >
              <Icon size={13} />
              <span className="hidden sm:inline uppercase tracking-wider">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
