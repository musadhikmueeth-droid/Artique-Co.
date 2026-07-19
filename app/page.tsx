import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center gap-8">
      {/* Hero */}
      <div className="flex flex-col items-center gap-4">
        <p className="animate-fade-in-up delay-100 text-[#94a3b8] tracking-[0.5em] uppercase text-xs font-medium">
          Est. 2026
        </p>
        <h1 className="animate-fade-in-up delay-200 text-6xl md:text-8xl font-bold tracking-tight gradient-text">
          Artique<span className="text-[#64748b]">.</span>
        </h1>
        <p className="animate-fade-in-up delay-300 text-[#94a3b8] text-lg md:text-xl max-w-md tracking-wide leading-relaxed">
          Curated luxury. Delivered with precision.
        </p>
      </div>

      {/* Divider */}
      <div className="animate-fade-in delay-400 flex items-center gap-4 w-48">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#94a3b8]/40" />
        <span className="text-[#94a3b8]/40 text-xs">◈</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#94a3b8]/40" />
      </div>

      {/* CTAs */}
      <div className="animate-fade-in-up delay-400 flex flex-col sm:flex-row gap-4">
        <Link href="/shop" className="btn-primary text-center">
          Explore Collection →
        </Link>
        <Link href="/settings" className="btn-outline text-center">
          About Us
        </Link>
      </div>

      {/* Feature cards */}
      <div className="animate-fade-in-up delay-500 grid grid-cols-3 gap-4 mt-4 w-full max-w-lg">
        {[
          { icon: '✦', text: 'Premium Quality' },
          { icon: '◈', text: 'Curated Selection' },
          { icon: '⟶', text: 'Fast Delivery' },
        ].map(({ icon, text }) => (
          <div
            key={text}
            className="glass p-4 text-center hover:border-[#94a3b8]/30 transition-all duration-300 hover:bg-white/10"
          >
            <p className="text-[#94a3b8] text-lg mb-1">{icon}</p>
            <p className="text-white/60 text-xs tracking-wider uppercase">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
