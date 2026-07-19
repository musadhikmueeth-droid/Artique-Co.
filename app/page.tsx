import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-10 px-4">

      {/* Badge */}
      <div className="animate-fade-in-up delay-100 inline-flex items-center gap-2 glass px-4 py-2 text-xs text-[#94a3b8] tracking-[0.3em] uppercase">
        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
        Est. 2026 — Premium Collection
      </div>

      {/* Hero Text */}
      <div className="flex flex-col items-center gap-4">
        <h1 className="animate-fade-in-up delay-200 luxury-text text-6xl md:text-8xl lg:text-9xl font-bold gradient-text leading-none tracking-tight">
          Artique
        </h1>
        <p className="animate-fade-in-up delay-300 text-[#475569] text-base md:text-lg max-w-sm tracking-widest uppercase font-light">
          Curated Luxury · Timeless Design
        </p>
      </div>

      {/* Divider */}
      <div className="animate-fade-in delay-300 divider w-32" />

      {/* CTAs */}
      <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-4">
        <Link href="/shop" className="btn-primary text-sm tracking-wider uppercase px-8 py-4">
          Explore Collection →
        </Link>
        <Link href="/settings" className="btn-outline text-sm tracking-wider uppercase px-8 py-4">
          Our Story
        </Link>
      </div>

      {/* Feature pills */}
      <div className="animate-fade-in-up delay-500 flex flex-wrap justify-center gap-3 mt-2">
        {[
          { icon: '✦', text: 'Premium Quality' },
          { icon: '◈', text: 'Handcrafted' },
          { icon: '⟶', text: 'Fast Delivery' },
          { icon: '◇', text: 'Luxury Packaging' },
        ].map(({ icon, text }) => (
          <div key={text} className="glass px-4 py-2 flex items-center gap-2 hover:border-[#94a3b8]/20 transition-all duration-300">
            <span className="text-[#475569] text-xs">{icon}</span>
            <span className="text-[#64748b] text-xs tracking-wider uppercase font-medium">{text}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
