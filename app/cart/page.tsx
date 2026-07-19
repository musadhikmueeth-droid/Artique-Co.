'use client';

import { useEffect, useState, useRef } from 'react';
import type { CartItem } from '@/lib/supabase';
import Link from 'next/link';

const WHATSAPP = '94785827734';

export default function CartPage() {
  const [cart, setCart]       = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [name, setName]       = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote]       = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
    setMounted(true);
  }, []);

  const updateQty = (id: number, delta: number) => {
    const updated = cart
      .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
      .filter((i) => i.quantity > 0);
    setCart(updated); localStorage.setItem('cart', JSON.stringify(updated));
  };

  const remove = (id: number) => {
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated); localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total     = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
  const orderNo   = `AQ-${Date.now().toString().slice(-6)}`;
  const today     = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });

  const buildMsg = () => {
    const lines = cart.map(i => `• ${i.name} x${i.quantity} — LKR ${(i.price*i.quantity).toLocaleString()}`).join('%0A');
    const customerInfo = name    ? `%0AName: ${encodeURIComponent(name)}`    : '';
    const addressInfo  = address ? `%0AAddress: ${encodeURIComponent(address)}` : '';
    const noteInfo     = note    ? `%0ANote: ${encodeURIComponent(note)}`    : '';
    return `*🛍 Artique Co. — New Order*%0AOrder No: ${orderNo}%0ADate: ${today}%0A%0A${lines}%0A%0A*Total: LKR ${total.toLocaleString()}*${customerInfo}${addressInfo}${noteInfo}%0A%0APlease confirm my order. Thank you!`;
  };

  const checkout = () => { if (cart.length) window.open(`https://wa.me/${WHATSAPP}?text=${buildMsg()}`, '_blank'); };

  if (!mounted) return null;

  return (
    <div className="max-w-2xl mx-auto">

      <div className="mb-8 anim-up">
        <Link href="/shop" className="btn-back">← Back to Shop</Link>
        <p className="text-[#4b5563] tracking-[0.3em] uppercase text-xs mb-2 font-medium">Your Order</p>
        <h1 className="serif text-4xl font-bold gold-text">
          Cart {itemCount > 0 && <span className="text-xl text-[#4b5563]">({itemCount})</span>}
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="glass p-16 text-center anim-in">
          <p className="text-4xl mb-4 anim-float inline-block">🛍️</p>
          <p className="text-[#6b7280] text-lg font-medium mb-2">Your cart is empty</p>
          <Link href="/shop" className="btn-gold inline-block mt-6 text-sm tracking-wider uppercase">Browse Products</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">

          {/* Cart Items */}
          {cart.map((item, i) => (
            <div key={item.id} className="glass p-4 flex items-center gap-4 anim-up hover:border-[#c9a84c]/10 transition-all duration-200"
              style={{ animationDelay:`${i*0.06}s`, opacity:0, borderColor:'rgba(201,168,76,0.06)' }}>
              {item.img_url
                ? <img src={item.img_url} alt={item.name} className="w-16 h-16 object-cover rounded-xl flex-shrink-0"/>
                : <div className="w-16 h-16 bg-gradient-to-br from-[#0d1525] to-[#111827] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-[#c9a84c]/20 text-xl">◈</span>
                  </div>
              }
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{item.name}</p>
                <p className="text-[#4b5563] text-xs mt-0.5">LKR {item.price?.toLocaleString()} each</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-white/[0.04] text-[#9ca3af] hover:text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all text-sm">−</button>
                <span className="text-white w-5 text-center text-sm font-medium">{item.quantity}</span>
                <button onClick={() => updateQty(item.id, 1)}  className="w-7 h-7 rounded-lg bg-white/[0.04] text-[#9ca3af] hover:text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all text-sm">+</button>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <p className="text-white text-sm font-semibold">LKR {(item.price*item.quantity).toLocaleString()}</p>
                <button onClick={() => remove(item.id)} className="text-[#374151] hover:text-red-400 transition-colors text-xs mt-0.5">Remove</button>
              </div>
            </div>
          ))}

          {/* Customer Info — editable */}
          <div className="glass p-6 anim-up d3" style={{borderColor:'rgba(201,168,76,0.08)'}}>
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium mb-4">Your Details (optional)</p>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[#4b5563] text-xs uppercase tracking-wider mb-1 block">Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name..."
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#374151] focus:outline-none focus:border-[#c9a84c]/30 transition-colors" />
              </div>
              <div>
                <label className="text-[#4b5563] text-xs uppercase tracking-wider mb-1 block">Delivery Address</label>
                <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Your address..."
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#374151] focus:outline-none focus:border-[#c9a84c]/30 transition-colors" />
              </div>
              <div>
                <label className="text-[#4b5563] text-xs uppercase tracking-wider mb-1 block">Note to seller</label>
                <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Any special requests..."
                  rows={2}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2.5 text-white text-sm placeholder-[#374151] focus:outline-none focus:border-[#c9a84c]/30 transition-colors resize-none" />
              </div>
            </div>
          </div>

          {/* Receipt Preview */}
          <div className="anim-up d4">
            <button onClick={() => setShowReceipt(!showReceipt)}
              className="w-full glass py-3 text-[#c9a84c]/70 text-xs tracking-widest uppercase hover:text-[#c9a84c] hover:border-[#c9a84c]/20 transition-all duration-200 flex items-center justify-center gap-2"
              style={{borderColor:'rgba(201,168,76,0.08)'}}>
              <span>{showReceipt ? '▲' : '▼'}</span>
              {showReceipt ? 'Hide Receipt Preview' : 'Preview Receipt'}
            </button>

            {showReceipt && (
              <div ref={receiptRef} className="mt-3 rounded-2xl overflow-hidden anim-in"
                style={{ background:'#f9f5ed', color:'#1a1409', fontFamily:'Georgia, serif' }}>
                {/* Receipt Header */}
                <div style={{ background:'#1a1409', padding:'24px', textAlign:'center' }}>
                  <div style={{ display:'flex', justifyContent:'center', marginBottom:'8px' }}>
                    <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                      <polygon points="16,2 20,12 30,12 22,19 25,30 16,23 7,30 10,19 2,12 12,12" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinejoin="round"/>
                      <circle cx="16" cy="16" r="4" fill="#c9a84c" opacity="0.9"/>
                    </svg>
                  </div>
                  <p style={{ color:'#c9a84c', letterSpacing:'0.4em', fontSize:'18px', fontWeight:700, marginBottom:'2px' }}>ARTIQUE Co.</p>
                  <p style={{ color:'#c9a84c80', fontSize:'10px', letterSpacing:'0.3em' }}>RECEIPT</p>
                </div>

                <div style={{ padding:'20px 24px' }}>
                  {/* Meta */}
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px', fontSize:'11px', color:'#6b5c3e' }}>
                    <span>Order: <strong style={{color:'#1a1409'}}>{orderNo}</strong></span>
                    <span>{today}</span>
                  </div>

                  {/* Dashed line */}
                  <div style={{ borderTop:'1px dashed #c9a84c40', marginBottom:'14px' }} />

                  {/* Items */}
                  {cart.map(i => (
                    <div key={i.id} style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px', fontSize:'13px' }}>
                      <span style={{ color:'#3d2f1a' }}>{i.name} <span style={{ color:'#9b8560', fontSize:'11px' }}>×{i.quantity}</span></span>
                      <span style={{ fontWeight:600, color:'#1a1409' }}>LKR {(i.price*i.quantity).toLocaleString()}</span>
                    </div>
                  ))}

                  <div style={{ borderTop:'1px dashed #c9a84c40', margin:'14px 0' }} />

                  {/* Total */}
                  <div style={{ display:'flex', justifyContent:'space-between', fontSize:'15px', fontWeight:700, marginBottom:'16px' }}>
                    <span style={{ color:'#3d2f1a' }}>TOTAL</span>
                    <span style={{ color:'#c9a84c' }}>LKR {total.toLocaleString()}</span>
                  </div>

                  {/* Customer info */}
                  {(name || address) && (
                    <div style={{ background:'#f0e8d4', borderRadius:'8px', padding:'10px 14px', marginBottom:'14px', fontSize:'11px', color:'#6b5c3e' }}>
                      {name    && <p>👤 {name}</p>}
                      {address && <p>📍 {address}</p>}
                      {note    && <p>📝 {note}</p>}
                    </div>
                  )}

                  <div style={{ textAlign:'center', marginTop:'16px', paddingTop:'16px', borderTop:'1px dashed #c9a84c40' }}>
                    <p style={{ color:'#9b8560', fontSize:'10px', letterSpacing:'0.2em' }}>THANK YOU FOR YOUR ORDER</p>
                    <p style={{ color:'#c9a84c80', fontSize:'9px', marginTop:'4px', letterSpacing:'0.15em' }}>Kalpitiya Road, Ettalai Colony</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary + Checkout */}
          <div className="glass p-6 anim-up d5" style={{borderColor:'rgba(201,168,76,0.1)'}}>
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium mb-4">Order Summary</p>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#4b5563]">Subtotal ({itemCount} items)</span>
                <span className="text-white">LKR {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4b5563]">Delivery</span>
                <span className="text-[#c9a84c] text-xs">Confirmed via WhatsApp</span>
              </div>
            </div>
            <div className="divider mb-4" />
            <div className="flex justify-between items-center mb-6">
              <span className="text-[#9ca3af] font-medium text-sm uppercase tracking-wider">Total</span>
              <span className="serif text-white font-bold text-2xl">LKR {total.toLocaleString()}</span>
            </div>
            <button onClick={checkout} className="btn-gold w-full flex items-center justify-center gap-3 py-4 text-sm tracking-widest uppercase">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
            </button>
            <p className="text-[#1f2937] text-xs text-center mt-3">Your name, address &amp; note will be included in the message.</p>
          </div>

        </div>
      )}
    </div>
  );
}
