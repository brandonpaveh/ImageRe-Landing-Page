import React from 'react';
import { Link } from 'react-router-dom';

const LegalTopBar: React.FC = () => (
  <header className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
    <div className="max-w-[960px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
      <Link
        to="/"
        className="text-[11px] font-black uppercase tracking-widest text-brand-dracula hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded"
      >
        ← Home
      </Link>
      <Link to="/" aria-label="ImageRE — Home" className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded-lg">
        <img src="/logo-gold.png" alt="ImageRE" className="h-10 w-auto" />
      </Link>
    </div>
  </header>
);

export default LegalTopBar;
