import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] text-center gap-8 px-4">

      {/* Badge */}
      <div className="anim-up d1 inline-flex items-center gap-2 glass px-5 py-2 text-[11px] tracking-[0.35em] uppercase" style={{borderColor:'rgba(201,168,76,0.15)'}}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" style={{boxShadow:'0 0 8px #c9a84c'}} />
        <span className="text-[#c9a84c]/70">Premium Collection — Est. 2026</span>
      </div>

      {/* Logo mark */}
      <div className="anim-up d2 anim-float">
        <svg width="72" height="72" viewBox="0 0 32 32" fill="none">
          <polygon points="16,2 20,12 30,12 22,19 25,30 16,23 7,30 10,19 2,12 12,12" fill="none" stroke="url(#gh)" strokeWidth="1.2" strokeLinejoin="round"/>
          <circle cx="16" cy="16" r="3.5" fill="url(#gh)" opacity="0.9"/>
          <defs>
            <linearGradient id="gh" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9a84c"/>
              <stop offset="100%" stopColor="#e8c97a"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Heading */}
      <div className="flex flex-col items-center gap-3">
        <h1 className="anim-up d2 serif text-7xl md:text-9xl font-light gold-text tracking-tight leading-none">
          Artique
        </h1>
        <p className="anim-up d3 text-[#374151] text-xs md:text-sm tracking-[0.5em] uppercase font-light">
          Curated Luxury · Timeless Craft
        </p>
      </div>

      {/* Divider */}
      <div className="anim-in d3 divider w-40" />

      {/* CTAs */}
      <div className="anim-up d4 flex flex-col sm:flex-row gap-4">
        <Link href="/shop" className="btn-gold text-sm tracking-widest uppercase px-10 py-4">
          Explore Collection
        </Link>
        <Link href="/settings" className="btn-outline text-sm tracking-widest uppercase px-10 py-4">
          Our Story
        </Link>
      </div>

      {/* Feature pills */}
      <div className="anim-up d5 flex flex-wrap justify-center gap-3">
        {['✦ Premium Quality', '◈ Handcrafted', '⟶ Fast Delivery', '◇ Luxury Packaging'].map((t) => (
          <div key={t} className="glass px-4 py-2 hover:border-[#c9a84c]/20 transition-all duration-300" style={{borderColor:'rgba(201,168,76,0.08)'}}>
            <span className="text-[#374151] text-xs tracking-widest uppercase font-medium">{t}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
