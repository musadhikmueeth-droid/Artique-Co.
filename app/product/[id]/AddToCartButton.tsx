'use client';

import { type Product } from '@/lib/supabase';

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = () => {
    const existing = JSON.parse(localStorage.getItem('cart') || '[]');
    const idx = existing.findIndex((i: Product & { quantity: number }) => i.id === product.id);
    if (idx >= 0) {
      existing[idx].quantity += 1;
    } else {
      existing.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(existing));
    alert(`${product.name} added to cart!`);
  };

  return (
    <button
      onClick={addToCart}
      disabled={product.stock === 0}
      className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </button>
  );
}
