'use client';

import { useEffect, useState } from 'react';
import type { CartItem } from '@/lib/supabase';
import Link from 'next/link';

const WHATSAPP = '94785827734';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    setMounted(true);
  }, []);

  const updateQty = (id: number, delta: number) => {
    const updated = cart
      .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
      .filter((i) => i.quantity > 0);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const remove = (id: number) => {
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  const checkout = () => {
    if (cart.length === 0) return;
    const lines = cart
      .map((i) => `• ${i.name} x${i.quantity} — LKR ${(i.price * i.quantity).toLocaleString()}`)
      .join('%0A');
    const msg = `*Artique Co. Order*%0A%0A${lines}%0A%0A*Total: LKR ${total.toLocaleString()}*%0A%0APlease confirm my order. Thank you!`;
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 animate-fade-in-up">
        <Link href="/shop" className="btn-back">← Back to Shop</Link>
        <p className="text-[#475569] tracking-[0.3em] uppercase text-xs mb-2 font-medium">Your Order</p>
        <h1 className="luxury-text text-4xl font-bold gradient-text">
          Cart {itemCount > 0 && <span className="text-xl text-[#475569]">({itemCount})</span>}
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="glass p-16 text-center animate-fade-in">
          <p className="text-4xl mb-4 animate-float">🛍️</p>
          <p className="text-[#64748b] text-lg font-medium mb-2">Your cart is empty</p>
          <p className="text-[#334155] text-sm mb-8">Discover our curated collection</p>
          <Link href="/shop" className="btn-primary inline-block">
            Browse Products →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {cart.map((item, i) => (
            <div
              key={item.id}
              className="glass p-4 flex items-center gap-4 animate-fade-in-up hover:border-white/10 transition-all duration-200"
              style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}
            >
              {item.img_url ? (
                <img src={item.img_url} alt={item.name} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-white/5 to-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white/20 text-xl">◈</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{item.name}</p>
                <p className="text-[#475569] text-xs mt-0.5">LKR {item.price?.toLocaleString()} each</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-white/[0.05] text-[#94a3b8] hover:bg-white/10 hover:text-white transition-all text-sm">−</button>
                <span className="text-white w-5 text-center text-sm font-medium">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-white/[0.05] text-[#94a3b8] hover:bg-white/10 hover:text-white transition-all text-sm">+</button>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="text-white text-sm font-semibold">LKR {(item.price * item.quantity).toLocaleString()}</p>
                <button onClick={() => remove(item.id)} className="text-[#334155] hover:text-red-400 transition-colors text-xs mt-0.5">Remove</button>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="glass p-6 mt-3 animate-fade-in-up delay-300">
            <p className="text-[#475569] text-xs tracking-widest uppercase mb-4 font-medium">Order Summary</p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#475569]">Subtotal ({itemCount} items)</span>
                <span className="text-white">LKR {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#475569]">Delivery</span>
                <span className="text-emerald-400 text-xs">Calculated on WhatsApp</span>
              </div>
            </div>
            <div className="divider mb-4" />
            <div className="flex justify-between items-center mb-6">
              <span className="text-[#94a3b8] font-semibold">Total</span>
              <span className="text-white font-bold text-2xl">LKR {total.toLocaleString()}</span>
            </div>
            <button onClick={checkout} className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-sm tracking-wider uppercase">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
            </button>
            <p className="text-[#1e293b] text-xs text-center mt-3">You&apos;ll be redirected to WhatsApp to confirm.</p>
          </div>
        </div>
      )}
    </div>
  );
}
