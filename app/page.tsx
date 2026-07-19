import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center gap-8">
      {/* Hero */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-[#94a3b8] tracking-[0.4em] uppercase text-sm">Est. 2024</p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white">
          Artique<span className="text-[#94a3b8]">.</span>
        </h1>
        <p className="text-[#94a3b8] text-lg md:text-xl max-w-md tracking-wide">
          Curated luxury. Delivered with precision.
        </p>
      </div>

      {/* Divider */}
      <div className="w-24 h-px bg-[#94a3b8]/40" />

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/shop" className="btn-primary">
          Explore Collection
        </Link>
        <Link href="/settings" className="btn-outline">
          About Us
        </Link>
      </div>

      {/* Floating cards */}
      <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-lg">
        {['Premium Quality', 'Curated Selection', 'Fast Delivery'].map((text) => (
          <div key={text} className="glass p-4 text-center">
            <p className="text-[#94a3b8] text-xs tracking-wider uppercase">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
