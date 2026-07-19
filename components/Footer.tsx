export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="luxury-text text-xl font-bold text-white tracking-widest">
            ARTIQUE<span className="text-[#475569]">.</span>
          </p>
          <p className="text-[#475569] text-xs mt-1 tracking-widest uppercase">Est. 2026</p>
        </div>
        <div className="text-center">
          <p className="text-[#475569] text-xs tracking-wider uppercase">Kalpitiya Road, Ettalai Colony</p>
          <p className="text-[#334155] text-xs mt-1">Crafted with precision. Delivered with care.</p>
        </div>
        <p className="text-[#1e293b] text-xs">© 2026 Artique Co.</p>
      </div>
    </footer>
  );
}
