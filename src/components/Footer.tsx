import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer aria-label="Site footer" className="bg-brand-dracula py-24 px-10 border-t border-white/10">
    <div className="max-w-[1440px] mx-auto flex flex-col gap-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <Link
          to="/"
          aria-label="ImageRE — Home"
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded-lg shrink-0"
        >
          <img src="/logo-white.png" alt="ImageRE" className="h-28 w-auto" />
        </Link>

        <nav aria-label="Footer navigation" className="w-full lg:w-auto">
          <ul className="flex flex-wrap justify-center lg:justify-end gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 list-none">
            <li>
              <Link
                to="/privacy"
                className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/privacy#do-not-sell-or-share"
                className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded"
              >
                Do Not Sell or Share My Personal Information
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>

        <p className="text-[10px] font-bold text-white/60 text-center lg:text-right">
          © {new Date().getFullYear()} ImageRE LLC. All rights reserved.
        </p>
      </div>
      <p className="text-[10px] font-bold text-white/50 text-center max-w-3xl mx-auto leading-relaxed">
        California residents: See our Privacy Policy for CPRA rights, Global Privacy Control (GPC), and how to opt out
        of the sale or sharing of personal information.
      </p>
    </div>
  </footer>
);

export default Footer;
