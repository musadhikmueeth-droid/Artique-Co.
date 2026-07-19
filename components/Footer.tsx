export default function Footer() {
  return (
    <footer className="mt-20 py-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-white font-bold tracking-widest text-lg">
            ARTIQUE<span className="text-[#64748b]">.</span>
          </p>
          <p className="text-white/30 text-xs mt-1">Est. 2026</p>
        </div>
        <p className="text-[#94a3b8]/50 text-xs tracking-wider text-center">
          Kalpitiya Road, Ettalai Colony
        </p>
        <p className="text-white/20 text-xs">Crafted with precision.</p>
      </div>
    </footer>
  );
}
