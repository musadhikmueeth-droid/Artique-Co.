import { supabase, type Product } from '@/lib/supabase';
import AddToCartButton from './AddToCartButton';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 0;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) notFound();

  const p = product as Product;

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/shop" className="btn-back animate-fade-in-up">← Back to Shop</Link>

      <div className="grid md:grid-cols-2 gap-10 animate-fade-in-up delay-100">
        {/* Image */}
        <div className="glass overflow-hidden">
          {p.img_url ? (
            <img
              src={p.img_url}
              alt={p.name}
              className="w-full h-96 object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-96 bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center rounded-2xl">
              <span className="text-[#1e293b] text-8xl">◈</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-5">
          <div>
            <p className="text-[#475569] tracking-[0.3em] uppercase text-xs mb-2 font-medium">{p.category}</p>
            <h1 className="luxury-text text-3xl md:text-4xl font-bold gradient-text leading-tight">{p.name}</h1>
            <p className="text-[#475569] mt-4 leading-relaxed text-sm">{p.description}</p>
          </div>

          <div className="divider" />

          <div className="glass p-4 flex items-center justify-between">
            <span className="text-[#475569] text-sm uppercase tracking-wider">Price</span>
            <span className="text-white font-bold text-2xl">LKR {p.price?.toLocaleString()}</span>
          </div>

          {p.stock !== undefined && (
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${p.stock > 0 ? 'bg-emerald-400' : 'bg-red-400'} shadow-lg`} />
              <span className="text-[#64748b] text-sm">
                {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          )}

          <AddToCartButton product={p} />

          <p className="text-[#1e293b] text-xs text-center">
            Free luxury packaging with every order
          </p>
        </div>
      </div>
    </div>
  );
}
