export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[#c9a84c]/10">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 20,12 30,12 22,19 25,30 16,23 7,30 10,19 2,12 12,12" fill="none" stroke="url(#gf)" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="16" cy="16" r="4" fill="url(#gf)" opacity="0.6"/>
            <defs>
              <linearGradient id="gf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c9a84c"/>
                <stop offset="100%" stopColor="#e8c97a"/>
              </linearGradient>
            </defs>
          </svg>
          <div>
            <p className="serif font-bold text-white tracking-widest text-sm">ARTIQUE Co.</p>
            <p className="text-[#c9a84c]/40 text-[10px] tracking-widest uppercase">Est. 2026</p>
          </div>
        </div>
        <p className="text-[#374151] text-xs tracking-wider">Kalpitiya Road, Ettalai Colony</p>
        <p className="text-[#1f2937] text-xs">© 2026 Artique Co. All rights reserved.</p>
      </div>
    </footer>
  );
}
