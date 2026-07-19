'use client';

import { type Product } from '@/lib/supabase';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const existing = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = existing.findIndex((i: Product & { quantity: number }) => i.id === product.id);
    if (idx >= 0) existing[idx].quantity += 1;
    else existing.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(existing));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button onClick={addToCart} disabled={product.stock === 0}
      className="btn-gold w-full py-4 text-sm tracking-widest uppercase disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
      {added ? '✓ Added to Cart!' : product.stock === 0 ? 'Out of Stock' : '+ Add to Cart'}
    </button>
  );
}
