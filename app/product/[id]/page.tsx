import { supabase, type Product } from '@/lib/supabase';
import AddToCartButton from './AddToCartButton';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 0;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: product, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error || !product) notFound();
  const p = product as Product;

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/shop" className="btn-back anim-up">← Back to Shop</Link>

      <div className="grid md:grid-cols-2 gap-10 anim-up d2">
        {/* Image */}
        <div className="glass overflow-hidden" style={{borderColor:'rgba(201,168,76,0.08)'}}>
          {p.img_url
            ? <img src={p.img_url} alt={p.name} className="w-full h-96 object-cover rounded-2xl hover:scale-105 transition-transform duration-500"/>
            : <div className="w-full h-96 rounded-2xl flex items-center justify-center" style={{background:'linear-gradient(135deg,#0d1525,#111827)'}}>
                <span style={{color:'rgba(201,168,76,0.15)',fontSize:'80px'}}>◈</span>
              </div>
          }
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-5">
          <div>
            <p className="text-[#4b5563] tracking-[0.3em] uppercase text-[10px] mb-2 font-medium">{p.category}</p>
            <h1 className="serif text-3xl md:text-4xl font-bold gold-text leading-tight">{p.name}</h1>
            <p className="text-[#4b5563] mt-4 leading-relaxed text-sm">{p.description}</p>
          </div>

          <div className="divider" />

          <div className="glass p-4 flex items-center justify-between" style={{borderColor:'rgba(201,168,76,0.1)'}}>
            <span className="text-[#4b5563] text-xs uppercase tracking-widest">Price</span>
            <span className="serif text-[#c9a84c] font-bold text-2xl">LKR {p.price?.toLocaleString()}</span>
          </div>

          {p.stock !== undefined && (
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${p.stock > 0 ? 'bg-emerald-400' : 'bg-red-400'}`} style={{boxShadow: p.stock > 0 ? '0 0 8px rgba(52,211,153,0.5)' : '0 0 8px rgba(248,113,113,0.5)'}}/>
              <span className="text-[#6b7280] text-sm">{p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}</span>
            </div>
          )}

          <AddToCartButton product={p} />
          <p className="text-[#1f2937] text-xs text-center tracking-wider">✦ Free luxury packaging with every order</p>
        </div>
      </div>
    </div>
  );
}
