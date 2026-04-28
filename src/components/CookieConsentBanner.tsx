import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'imagere_cookie_consent_v1';

export type CookieConsentChoice = 'all' | 'essential';

export function getStoredCookieConsent(): CookieConsentChoice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'all' || v === 'essential') return v;
  } catch {
    /* ignore */
  }
  return null;
}

/** True when the browser sends Global Privacy Control (CPRA opt-out signal). */
export function getGlobalPrivacyControl(): boolean {
  if (typeof navigator === 'undefined') return false;
  return navigator.globalPrivacyControl === true;
}

const CookieConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [gpcNotice, setGpcNotice] = useState(false);

  useEffect(() => {
    const gpc = getGlobalPrivacyControl();
    const existing = getStoredCookieConsent();

    if (gpc && !existing) {
      try {
        localStorage.setItem(STORAGE_KEY, 'essential');
      } catch {
        /* ignore */
      }
      setGpcNotice(true);
      setVisible(true);
      window.setTimeout(() => setVisible(false), 8000);
      return;
    }

    if (!existing) {
      setVisible(true);
    }
  }, []);

  const persist = (choice: CookieConsentChoice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
    setGpcNotice(false);
    window.dispatchEvent(new CustomEvent('imagere-cookie-consent', { detail: { choice } }));
  };

  if (!visible) return null;

  if (gpcNotice) {
    return (
      <div
        role="region"
        aria-label="Privacy preferences"
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-brand-dracula text-white border-t border-white/20 shadow-2xl motion-safe:animate-fade-in"
      >
        <div className="max-w-[960px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm font-bold text-white/90 leading-relaxed">
            We detected a Global Privacy Control signal from your browser and applied “Reject non-essential cookies /
            Do Not Sell or Share” by default, as required in California. You can change this anytime in your browser or
            by contacting us (see Privacy Policy).
          </p>
          <button
            type="button"
            onClick={() => {
              setGpcNotice(false);
              setVisible(false);
            }}
            className="shrink-0 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest bg-brand-mint text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dracula"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-white border-t border-stone-200 shadow-[0_-8px_40px_rgba(0,0,0,0.12)] motion-safe:animate-fade-in"
    >
      <div className="max-w-[960px] mx-auto">
        <h2 id="cookie-consent-title" className="text-sm font-black uppercase tracking-wider text-brand-dracula mb-3">
          Cookies & similar technologies
        </h2>
        <p id="cookie-consent-desc" className="text-sm font-bold text-stone-600 leading-relaxed mb-6">
          We use cookies and similar technologies that are strictly necessary for the site to function, and we may use
          optional analytics or advertising tools only with your consent. Closing this bar without choosing an option does
          not opt you in.           Read our{' '}
          <Link to="/privacy" className="text-brand-mint underline underline-offset-2 hover:opacity-80">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
          <button
            type="button"
            onClick={() => persist('essential')}
            className="w-full sm:w-auto sm:min-w-[200px] px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.35em] bg-brand-dracula text-white border-2 border-brand-dracula hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => persist('all')}
            className="w-full sm:w-auto sm:min-w-[200px] px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.35em] bg-brand-dracula text-white border-2 border-brand-dracula hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
