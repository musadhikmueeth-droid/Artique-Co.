import { supabase, type Product } from '@/lib/supabase';
import AddToCartButton from './AddToCartButton';
import { notFound } from 'next/navigation';

export const revalidate = 60;

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
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="glass overflow-hidden">
          {p.image_url ? (
            <img
              src={p.image_url}
              alt={p.name}
              className="w-full h-80 object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full h-80 bg-white/5 flex items-center justify-center rounded-2xl">
              <span className="text-white/20 text-7xl">◈</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-6">
          <div>
            <p className="text-[#94a3b8] tracking-widest uppercase text-xs mb-2">{p.category}</p>
            <h1 className="text-3xl font-bold text-white">{p.name}</h1>
            <p className="text-[#94a3b8] mt-3 leading-relaxed">{p.description}</p>
          </div>

          <div className="glass p-4 flex items-center justify-between">
            <span className="text-white/60 text-sm">Price</span>
            <span className="text-white font-bold text-2xl">
              LKR {p.price?.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className={`w-2 h-2 rounded-full ${p.stock > 0 ? 'bg-emerald-400' : 'bg-red-400'}`} />
            <span className="text-[#94a3b8]">{p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}</span>
          </div>

          <AddToCartButton product={p} />
        </div>
      </div>
    </div>
  );
}
