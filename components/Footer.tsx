export default function Footer() {
  return (
    <footer className="mt-20 py-10 border-t border-white/10 text-center">
      <p className="text-[#94a3b8] text-sm tracking-widest uppercase">
        © {new Date().getFullYear()} Artique Co. — Kalpitiya Road, Ettalai Colony
      </p>
      <p className="text-white/20 text-xs mt-2">Crafted with precision. Delivered with care.</p>
    </footer>
  );
}
