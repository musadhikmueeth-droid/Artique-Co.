import { supabase, type Product } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0;

export default async function ShopPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="mb-10 animate-fade-in-up">
        <Link href="/" className="btn-back">← Back to Home</Link>
        <p className="text-[#475569] tracking-[0.3em] uppercase text-xs mb-2 font-medium">Collection</p>
        <h1 className="luxury-text text-4xl md:text-5xl font-bold gradient-text">Our Products</h1>
      </div>

      {error && (
        <div className="glass p-6 text-center border-red-500/20 animate-fade-in">
          <p className="text-red-400 font-medium">Could not load products.</p>
          <p className="text-[#334155] text-sm mt-1">{error.message}</p>
        </div>
      )}

      {!error && (!products || products.length === 0) && (
        <div className="glass p-16 text-center animate-fade-in">
          <p className="text-[#64748b] text-lg">No products available yet.</p>
          <p className="text-[#334155] text-sm mt-2">Check back soon for our curated collection.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(products as Product[])?.map((product, i) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="glass group hover:border-[#94a3b8]/20 transition-all duration-400 overflow-hidden hover:scale-[1.02] hover:shadow-xl hover:shadow-black/40 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
          >
            <div className="overflow-hidden rounded-t-2xl">
              {product.img_url ? (
                <img
                  src={product.img_url}
                  alt={product.name}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-600"
                />
              ) : (
                <div className="w-full h-52 bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center">
                  <span className="text-[#1e293b] text-6xl">◈</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <p className="text-[#475569] text-xs tracking-[0.2em] uppercase mb-1 font-medium">{product.category}</p>
              <h2 className="text-white font-semibold text-base leading-snug">{product.name}</h2>
              <p className="text-[#334155] text-xs mt-1.5 line-clamp-2 leading-relaxed">{product.description}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.05]">
                <p className="text-white font-bold text-lg">
                  LKR {product.price?.toLocaleString()}
                </p>
                <span className="text-[#475569] text-xs group-hover:text-[#94a3b8] group-hover:translate-x-1 transition-all duration-200 uppercase tracking-wider">
                  View →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
