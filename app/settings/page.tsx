'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const content = {
    en: {
      about: 'About Us',
      story: `Artique Co. was born from a desire to bring minimalist, luxury-grade products to everyday life. We believe great design should be accessible — crafted with precision, delivered with care.`,
      address: 'Kalpitiya Road, Ettalai Colony',
      lang: 'Language',
      theme: 'Theme',
      dark: 'Dark Mode',
      light: 'Light Mode',
    },
    ta: {
      about: 'எங்களைப் பற்றி',
      story: `Artique Co. அன்றாட வாழ்க்கையில் குறைந்தபட்ச, ஆடம்பர தரமான பொருட்களை கொண்டு வர வேண்டும் என்ற விருப்பத்தில் உருவானது. சிறந்த வடிவமைப்பு அனைவருக்கும் கிடைக்க வேண்டும் என்று நம்புகிறோம்.`,
      address: 'கல்பிட்டி சாலை, எட்டலை காலனி',
      lang: 'மொழி',
      theme: 'தீம்',
      dark: 'இருண்ட பயன்முறை',
      light: 'ஒளிர்ந்த பயன்முறை',
    },
  };

  const t = content[lang];

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8">
      <div className="mb-2">
        <p className="text-[#94a3b8] tracking-widest uppercase text-sm mb-2">Preferences</p>
        <h1 className="text-4xl font-bold text-white">Settings</h1>
      </div>

      {/* About Us */}
      <div className="glass p-8">
        <h2 className="text-xl font-bold text-white mb-4">{t.about}</h2>
        <p className="text-[#94a3b8] leading-relaxed mb-4">{t.story}</p>
        <div className="flex items-center gap-3 glass-dark p-3">
          <span className="text-[#94a3b8]">📍</span>
          <span className="text-white/80 text-sm">{t.address}</span>
        </div>
      </div>

      {/* Language Toggle */}
      <div className="glass p-6">
        <h2 className="text-lg font-semibold text-white mb-4">{t.lang}</h2>
        <div className="flex gap-3">
          {(['en', 'ta'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                lang === l
                  ? 'bg-[#94a3b8] text-[#0f172a]'
                  : 'border border-[#94a3b8]/40 text-[#94a3b8] hover:border-[#94a3b8]'
              }`}
            >
              {l === 'en' ? 'English' : 'தமிழ்'}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="glass p-6">
        <h2 className="text-lg font-semibold text-white mb-4">{t.theme}</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className={`relative w-14 h-7 rounded-full transition-all ${
              dark ? 'bg-[#94a3b8]' : 'bg-white/20'
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 bg-[#0f172a] rounded-full transition-all ${
                dark ? 'left-8' : 'left-1'
              }`}
            />
          </button>
          <span className="text-[#94a3b8] text-sm">{dark ? t.dark : t.light}</span>
        </div>
      </div>
    </div>
  );
}
