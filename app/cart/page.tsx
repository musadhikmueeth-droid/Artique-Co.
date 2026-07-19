'use client';

import { useEffect, useState } from 'react';
import type { CartItem } from '@/lib/supabase';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    setMounted(true);
  }, []);

  const updateQty = (id: string, delta: number) => {
    const updated = cart
      .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
      .filter((i) => i.quantity > 0);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const remove = (id: string) => {
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const checkout = () => {
    if (cart.length === 0) return;
    const lines = cart
      .map((i) => `• ${i.name} x${i.quantity} — LKR ${(i.price * i.quantity).toLocaleString()}`)
      .join('%0A');
    const msg = `*Artique Co. Order*%0A%0A${lines}%0A%0A*Total: LKR ${total.toLocaleString()}*`;
    window.open(`https://wa.me/94729540545?text=${msg}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <Link href="/shop" className="btn-back mb-4 inline-flex">
          ← Back to Shop
        </Link>
        <p className="text-[#94a3b8] tracking-widest uppercase text-xs mb-2 font-medium">Your Order</p>
        <h1 className="text-4xl font-bold gradient-text">Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="glass p-12 text-center animate-fade-in">
          <p className="text-5xl mb-4">🛍️</p>
          <p className="text-[#94a3b8] text-lg">Your cart is empty.</p>
          <Link href="/shop" className="btn-primary inline-block mt-6">
            Browse Products →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item, i) => (
            <div
              key={item.id}
              className="glass p-4 flex items-center gap-4 animate-fade-in-up hover:border-white/20 transition-all duration-200"
              style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-white/5 to-white/10 rounded-xl flex items-center justify-center">
                  <span className="text-white/20 text-2xl">◈</span>
                </div>
              )}
              <div className="flex-1">
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-[#94a3b8] text-sm">LKR {item.price?.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, -1)}
                  className="w-8 h-8 rounded-lg bg-white/5 text-white hover:bg-white/15 transition-all duration-200 hover:scale-110"
                >
                  −
                </button>
                <span className="text-white w-6 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="w-8 h-8 rounded-lg bg-white/5 text-white hover:bg-white/15 transition-all duration-200 hover:scale-110"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => remove(item.id)}
                className="text-red-400/50 hover:text-red-400 transition-all duration-200 text-sm ml-2 hover:scale-110"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Summary */}
          <div className="glass p-6 mt-2 animate-fade-in-up delay-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/50 text-sm">{cart.reduce((s, i) => s + i.quantity, 0)} items</span>
            </div>
            <div className="flex justify-between items-center mb-6 border-t border-white/10 pt-4">
              <span className="text-[#94a3b8] font-medium">Total</span>
              <span className="text-white font-bold text-2xl">
                LKR {total.toLocaleString()}
              </span>
            </div>
            <button
              onClick={checkout}
              className="btn-primary w-full flex items-center justify-center gap-2 text-base"
            >
              <span>Checkout via WhatsApp</span>
              <span>→</span>
            </button>
            <p className="text-white/25 text-xs text-center mt-3">
              You&apos;ll be redirected to WhatsApp to confirm your order.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
