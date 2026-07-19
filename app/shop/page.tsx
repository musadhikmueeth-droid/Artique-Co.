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
      <div className="mb-10 anim-up">
        <Link href="/" className="btn-back">← Back to Home</Link>
        <p className="text-[#4b5563] tracking-[0.3em] uppercase text-xs mb-2 font-medium">Collection</p>
        <h1 className="serif text-5xl font-bold gold-text">Our Products</h1>
      </div>

      {error && (
        <div className="glass p-6 text-center anim-in" style={{borderColor:'rgba(239,68,68,0.2)'}}>
          <p className="text-red-400 font-medium">Could not load products.</p>
          <p className="text-[#374151] text-sm mt-1">{error.message}</p>
        </div>
      )}

      {!error && (!products || products.length === 0) && (
        <div className="glass p-16 text-center anim-in">
          <p className="text-[#6b7280] text-lg">No products available yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {(products as Product[])?.map((product, i) => (
          <Link key={product.id} href={`/product/${product.id}`}
            className="glass group overflow-hidden transition-all duration-400 hover:scale-[1.02] hover:shadow-2xl anim-up"
            style={{ animationDelay:`${i*0.07}s`, opacity:0, borderColor:'rgba(201,168,76,0.06)' }}>
            <div className="overflow-hidden rounded-t-2xl relative">
              {product.img_url
                ? <img src={product.img_url} alt={product.name} className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-600"/>
                : <div className="w-full h-52 flex items-center justify-center" style={{background:'linear-gradient(135deg,#0d1525,#111827)'}}>
                    <span style={{color:'rgba(201,168,76,0.15)',fontSize:'48px'}}>◈</span>
                  </div>
              }
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
            </div>
            <div className="p-5">
              <p className="text-[#4b5563] text-[10px] tracking-[0.25em] uppercase mb-1 font-medium">{product.category}</p>
              <h2 className="text-white font-semibold text-base leading-snug">{product.name}</h2>
              <p className="text-[#374151] text-xs mt-1.5 line-clamp-2 leading-relaxed">{product.description}</p>
              <div className="flex items-center justify-between mt-4 pt-4" style={{borderTop:'1px solid rgba(255,255,255,0.04)'}}>
                <p className="serif text-[#c9a84c] font-bold text-lg">LKR {product.price?.toLocaleString()}</p>
                <span className="text-[#374151] text-xs group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-200 uppercase tracking-wider">View →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
