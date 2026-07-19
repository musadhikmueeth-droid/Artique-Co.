'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [lang, setLang] = useState<'en' | 'ta'>('en');

  const content = {
    en: {
      about: 'About Artique Co.',
      story: `Artique Co. was born from a passion for minimalist, luxury-grade craftsmanship. Founded in 2026, we curate timeless pieces — from handcrafted jewellery to premium accessories — designed for those who appreciate refined elegance. Every item in our collection is selected with care, ensuring the highest standard of quality and artistry.`,
      address: 'Kalpitiya Road, Ettalai Colony',
      phone: '+94 78 582 7734',
      lang: 'Language',
      contact: 'Contact Us',
    },
    ta: {
      about: 'Artique Co. பற்றி',
      story: `Artique Co. குறைந்தபட்ச, ஆடம்பர தரமான கைவினைப் பொருட்களின் மீதான ஆர்வத்தில் உருவானது. 2026-ல் நிறுவப்பட்ட நாங்கள், கைவினை நகைகள் முதல் பிரீமியம் ஆபரணங்கள் வரை, மெருகூட்டப்பட்ட நேர்த்தியை பாராட்டுவோருக்காக காலத்தை தாண்டிய பொருட்களை தேர்வு செய்கிறோம்.`,
      address: 'கல்பிட்டி சாலை, எட்டலை காலனி',
      phone: '+94 78 582 7734',
      lang: 'மொழி',
      contact: 'தொடர்பு கொள்ள',
    },
  };

  const t = content[lang];

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div className="mb-2 animate-fade-in-up">
        <Link href="/" className="btn-back">← Back to Home</Link>
        <p className="text-[#475569] tracking-[0.3em] uppercase text-xs mb-2 font-medium">Preferences</p>
        <h1 className="luxury-text text-4xl font-bold gradient-text">Settings</h1>
      </div>

      {/* About */}
      <div className="glass p-8 animate-fade-in-up delay-100">
        <h2 className="luxury-text text-xl font-bold text-white mb-4">{t.about}</h2>
        <p className="text-[#475569] leading-relaxed text-sm mb-6">{t.story}</p>
        <div className="divider mb-4" />
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <span className="text-[#475569] mt-0.5">📍</span>
            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-wider mb-0.5">Address</p>
              <p className="text-white/80 text-sm">{t.address}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#475569] mt-0.5">📱</span>
            <div>
              <p className="text-[#64748b] text-xs uppercase tracking-wider mb-0.5">WhatsApp</p>
              <a
                href="https://wa.me/94785827734"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] text-sm hover:text-white transition-colors"
              >
                {t.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="glass p-6 animate-fade-in-up delay-200">
        <h2 className="text-sm font-semibold text-[#94a3b8] mb-4 uppercase tracking-wider">{t.lang}</h2>
        <div className="flex gap-3">
          {(['en', 'ta'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-6 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 ${
                lang === l
                  ? 'bg-gradient-to-r from-[#94a3b8] to-[#cbd5e1] text-[#0a0f1e]'
                  : 'border border-[#1e293b] text-[#475569] hover:border-[#475569] hover:text-[#94a3b8]'
              }`}
            >
              {l === 'en' ? '🇬🇧 English' : '🇱🇰 தமிழ்'}
            </button>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="glass p-6 animate-fade-in-up delay-300">
        <h2 className="text-sm font-semibold text-[#94a3b8] mb-4 uppercase tracking-wider">{t.contact}</h2>
        <a
          href="https://wa.me/94785827734"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-3 text-sm tracking-wider uppercase"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
