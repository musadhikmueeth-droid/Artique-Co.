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
        <Link href="/" className="btn-back mb-4 inline-flex">
          ← Back to Home
        </Link>
        <p className="text-[#94a3b8] tracking-widest uppercase text-xs mb-2 font-medium">Collection</p>
        <h1 className="text-4xl font-bold gradient-text">Our Products</h1>
      </div>

      {error && (
        <div className="glass p-6 text-center text-red-400 animate-fade-in">
          <p>Could not load products.</p>
          <p className="text-sm text-white/40 mt-1">{error.message}</p>
        </div>
      )}

      {!error && (!products || products.length === 0) && (
        <div className="glass p-12 text-center animate-fade-in">
          <p className="text-[#94a3b8] text-lg">No products found.</p>
          <p className="text-white/30 text-sm mt-2">
            Add rows to the <code className="text-[#94a3b8]">products</code> table in Supabase.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(products as Product[])?.map((product, i) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="glass group hover:border-[#94a3b8]/40 transition-all duration-300 overflow-hidden hover:scale-[1.02] hover:shadow-lg hover:shadow-[#94a3b8]/5 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            {product.img_url ? (
              <img
                src={product.img_url}
                alt={product.name}
                className="w-full h-56 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-56 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center rounded-t-2xl">
                <span className="text-white/20 text-5xl">◈</span>
              </div>
            )}
            <div className="p-5">
              <p className="text-[#94a3b8] text-xs tracking-widest uppercase mb-1">{product.category}</p>
              <h2 className="text-white font-semibold text-lg">{product.name}</h2>
              <p className="text-white/50 text-sm mt-1 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-white font-bold text-xl">
                  LKR {product.price?.toLocaleString()}
                </p>
                <span className="text-[#94a3b8] text-xs group-hover:translate-x-1 transition-transform duration-200">
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
