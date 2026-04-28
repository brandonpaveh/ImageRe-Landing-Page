import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Menu,
  X,
  CheckCircle2,
  Calendar,
  Wand2,
  Grid,
  Instagram,
  Facebook,
  Camera,
} from 'lucide-react';
import Footer from './Footer';

/** Practical email shape: local@domain.tld (no spaces, has TLD segment). */
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/** Formats up to 10 digits as (555) 555-5555 while typing. */
function formatUsPhoneDigits(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const IntakeForm: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    forTeam: false,
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const successRef = useRef<HTMLDivElement>(null);

  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzCjvbe12lNQhS7Xwus-aJDeQYvRexlRiQ_Yr2TcNCxkzG8TW-in59zCqj8VO3S4jdj/exec';

  const phoneDigits = form.phone.replace(/\D/g, '');
  const emailTrimmed = form.email.trim();
  const nameOk = form.name.trim().length > 0;
  const emailOk = EMAIL_PATTERN.test(emailTrimmed);
  const phoneOk = phoneDigits.length === 10;
  const canSubmit = form.consent && nameOk && emailOk && phoneOk && !submitting;

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setForm(prev => ({ ...prev, phone: formatUsPhoneDigits(e.target.value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent || !nameOk || !emailOk || !phoneOk) {
      setError('Please complete your name, a valid email, and a full 10-digit phone number, and accept the consent.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        email: emailTrimmed,
        phone: form.phone,
      };
      // Use text/plain (not application/json) so the browser skips CORS preflight.
      // Google Apps Script still receives the body in doPost as e.postData.contents.
      const response = await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setSubmitted(true);
    } catch {
      setError('Submission failed. Please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      aria-labelledby="intake-heading"
      className="py-48 bg-brand-dracula overflow-hidden relative"
    >
      <div aria-hidden="true" className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-mint/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-10 relative z-10">

        <div className="text-center mb-16">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/70 mb-10">
            EARLY ACCESS
          </p>
          <h2
            id="intake-heading"
            className="text-7xl lg:text-[84px] font-black tracking-tighter uppercase text-white leading-none"
          >
            GET EARLY <br /> ACCESS
          </h2>
          <p className="mt-8 text-sm font-bold text-white/70">
            Be the first to know when we launch.
          </p>
        </div>

        <div className="max-w-[680px] mx-auto bg-white rounded-[64px] p-16 lg:p-20 shadow-2xl">
          <div aria-live="polite" aria-atomic="true">
            {submitted ? (
              <div
                ref={successRef}
                tabIndex={-1}
                className="text-center py-12 space-y-6 focus:outline-none"
              >
                <div className="w-16 h-16 bg-brand-mint/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} className="text-brand-mint" aria-hidden="true" />
                </div>
                <p className="text-2xl font-black uppercase tracking-tighter text-brand-dracula">
                  YOU'RE ON THE LIST
                </p>
                <p className="text-sm font-bold text-stone-600">
                  We'll reach out as soon as we're ready.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-8" noValidate>
                {(
                  [
                    {
                      label: 'Full Name',
                      name: 'name' as const,
                      type: 'text',
                      placeholder: 'Jane Smith',
                      autocomplete: 'name',
                      required: true,
                    },
                    {
                      label: 'Email',
                      name: 'email' as const,
                      type: 'email',
                      placeholder: 'jane@brokerage.com',
                      autocomplete: 'email',
                      required: true,
                    },
                    {
                      label: 'Phone Number',
                      name: 'phone' as const,
                      type: 'tel',
                      placeholder: '(555) 555-5555',
                      autocomplete: 'tel',
                      required: true,
                    },
                    {
                      label: 'Company / Brokerage',
                      name: 'company' as const,
                      type: 'text',
                      placeholder: 'Smith Realty Group',
                      autocomplete: 'organization',
                      required: false,
                    },
                    {
                      label: 'Title',
                      name: 'title' as const,
                      type: 'text',
                      placeholder: 'Realtor, Broker, Loan Officer…',
                      autocomplete: 'organization-title',
                      required: false,
                    },
                  ] as const
                ).map(field => (
                  <div key={field.name} className={field.name === 'title' ? 'sm:col-span-2' : ''}>
                    <label
                      htmlFor={`intake-${field.name}`}
                      className="block text-xs font-black uppercase tracking-[0.25em] text-brand-dracula mb-2 leading-snug"
                    >
                      {field.label}
                      {field.required ? (
                        <span aria-hidden="true" className="text-brand-mint ml-1.5 font-black">
                          *
                        </span>
                      ) : null}
                    </label>
                    <input
                      id={`intake-${field.name}`}
                      required={field.required}
                      aria-required={field.required ? 'true' : 'false'}
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={field.name === 'phone' ? handlePhoneChange : handleChange}
                      placeholder={field.placeholder}
                      autoComplete={field.autocomplete}
                      inputMode={field.name === 'phone' ? 'numeric' : undefined}
                      maxLength={field.name === 'phone' ? 14 : undefined}
                      aria-invalid={
                        field.name === 'email'
                          ? emailTrimmed.length > 0 && !emailOk
                          : field.name === 'phone'
                            ? phoneDigits.length > 0 && !phoneOk
                            : undefined
                      }
                      className="w-full bg-stone-50 border border-stone-300 rounded-2xl px-6 py-4 text-brand-dracula text-sm font-bold placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-mint focus:border-transparent transition-all aria-invalid:border-red-400 aria-invalid:focus:ring-red-400/40"
                    />
                  </div>
                ))}

                {/* Team toggle */}
                <div className="sm:col-span-2">
                  <p id="team-label" className="text-xs font-black uppercase tracking-[0.25em] text-brand-dracula mb-4">
                    Signing up for a team?
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={form.forTeam}
                      aria-labelledby="team-label"
                      onClick={() => setForm(prev => ({ ...prev, forTeam: !prev.forTeam }))}
                      className={`relative w-12 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 ${form.forTeam ? 'bg-brand-mint' : 'bg-stone-300'}`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.forTeam ? 'translate-x-6' : 'translate-x-0'}`}
                      />
                      <span className="sr-only">{form.forTeam ? 'Yes, for my team' : 'No, just for me'}</span>
                    </button>
                    <span className="text-sm font-black uppercase tracking-tight text-brand-dracula" aria-live="polite">
                      {form.forTeam ? 'YES — FOR MY TEAM' : 'NO — JUST FOR ME'}
                    </span>
                  </div>
                </div>

                <p className="sm:col-span-2 text-xs font-bold text-stone-500 leading-relaxed border border-stone-200 rounded-2xl p-4 bg-stone-50/80">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-dracula block mb-2">
                    Notice — automated processing
                  </span>
                  We may use software tools (including AI-assisted tools in the future) to organize or respond to your
                  request. Submitting this form does not solely determine eligibility for employment, housing, credit, or
                  similar decisions without appropriate human review where required by law.
                </p>

                {/* Consent checkbox */}
                <div className="sm:col-span-2 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="relative mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        id="intake-consent"
                        name="consent"
                        checked={form.consent}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        className="w-5 h-5 rounded-md border-2 border-stone-300 text-brand-mint cursor-pointer focus:ring-2 focus:ring-brand-mint focus:ring-offset-2 accent-brand-mint"
                      />
                    </div>
                    <label htmlFor="intake-consent" className="text-sm font-bold text-stone-600 leading-relaxed cursor-pointer hover:text-brand-dracula transition-colors">
                      I agree to receive marketing communications and consent to being contacted by ImageRE LLC for business purposes, including product updates, promotional offers, and sales outreach.
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    aria-disabled={!canSubmit}
                    aria-busy={submitting}
                    className="w-full py-6 bg-brand-dracula text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2"
                  >
                    {submitting ? 'SUBMITTING…' : 'REQUEST EARLY ACCESS'}
                  </button>
                  {!canSubmit && !submitting && (
                    <p className="text-xs text-stone-500 font-bold text-center mt-4">
                      {!form.consent
                        ? 'Please check the consent box above to continue.'
                        : 'Enter your full name, a valid email, and a complete 10-digit U.S. phone number.'}
                    </p>
                  )}
                  {error && (
                    <p role="alert" className="text-xs text-red-600 font-bold text-center mt-4">
                      {error}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector('a');
      if (firstLink) (firstLink as HTMLElement).focus();
    }
  }, [mobileMenuOpen]);

  const features = [
    {
      title: 'POST STUDIO',
      desc: 'AI-generated social media images and captions for Instagram and Facebook. Add your idea, pick your tone, and get on-brand posts with your Personalized Identity Kit overlay.',
      icon: <Camera className="text-brand-mint" size={20} aria-hidden="true" />,
    },
    {
      title: 'TEMPLATE VAULT',
      desc: 'Professionally curated templates for Just Listed, Just Sold, Mortgage Market, and Education. Upload your own photos and videos or use the vault—all social-ready.',
      icon: <Grid className="text-brand-mint" size={20} aria-hidden="true" />,
    },
    {
      title: 'SCHEDULE POSTS',
      desc: 'One-click generated content for a month of scheduled posts. Choose buyer, seller, market update, or investor themes and we\'ll suggest optimal posting times.',
      icon: <Calendar className="text-brand-mint" size={20} aria-hidden="true" />,
    },
    {
      title: 'AND MORE',
      desc: 'Real estate focused AI to get you in front of your clients and future clients faster.',
      icon: <Zap className="text-brand-mint" size={20} aria-hidden="true" />,
    },
  ];

  return (
    <>
      {/* Skip navigation — visible on focus for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-white focus:text-brand-dracula focus:rounded-xl focus:font-black focus:text-sm focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-mint"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-white font-sans text-brand-dracula selection:bg-brand-mint selection:text-white overflow-x-hidden">

        {/* NAVIGATION */}
        <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
          <div className="max-w-[1440px] mx-auto px-10 h-24 flex items-center justify-between">
            <Link to="/" aria-label="ImageRE — Home" className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded-lg">
              <img src="/logo-gold.png" alt="ImageRE" className="h-36 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-widest text-stone-700">
              <a href="#features" className="hover:text-brand-dracula transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded focus-visible:ring-offset-2">FEATURES</a>
              <a href="#workflow" className="hover:text-brand-dracula transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded focus-visible:ring-offset-2">HOW IT WORKS</a>
              <a href="#pricing" className="hover:text-brand-dracula transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded focus-visible:ring-offset-2">PRICING</a>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <span className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-stone-500" aria-label="Coming soon">
                COMING SOON
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden p-2 text-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>

          {/* MOBILE MENU */}
          {mobileMenuOpen && (
            <div
              id="mobile-menu"
              ref={mobileMenuRef}
              role="dialog"
              aria-label="Navigation menu"
              className="lg:hidden bg-white border-t border-stone-100 px-10 py-8 space-y-6 motion-safe:animate-fade-in"
            >
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-[11px] font-black uppercase tracking-widest text-stone-700 hover:text-brand-dracula transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded">FEATURES</a>
              <a href="#workflow" onClick={() => setMobileMenuOpen(false)} className="block text-[11px] font-black uppercase tracking-widest text-stone-700 hover:text-brand-dracula transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded">HOW IT WORKS</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-[11px] font-black uppercase tracking-widest text-stone-700 hover:text-brand-dracula transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded">PRICING</a>
              <div className="pt-4 border-t border-stone-100">
                <span className="text-[11px] font-black uppercase tracking-widest text-stone-500">COMING SOON</span>
              </div>
            </div>
          )}
        </nav>

        <main id="main-content" tabIndex={-1} className="focus:outline-none">

          {/* HERO SECTION */}
          <section aria-labelledby="hero-heading" className="pt-48 pb-32 px-10">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <div className="lg:w-[55%] z-10 text-center lg:text-left">
                <h1
                  id="hero-heading"
                  className="text-6xl lg:text-[88px] font-black leading-[0.85] mb-10 text-brand-dracula tracking-tighter uppercase"
                >
                  AI FOR <br />
                  REAL ESTATE <br />
                  POSTS <br />
                  <span className="text-brand-mint">
                    CREATED FOR <br /> YOU.
                  </span>
                </h1>
                <p className="text-base text-stone-600 mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0 font-bold">
                  Stop worrying about what to post. One simple idea generates your entire social
                  media calendar, video tours, and staging in seconds.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-start">
                  <span className="px-12 py-7 text-stone-500 font-black text-[11px] uppercase tracking-widest" aria-label="Coming soon">
                    COMING SOON
                  </span>
                  <div className="flex items-center gap-3" aria-label="AI system status: ready">
                    <div className="w-2 h-2 bg-green-600 rounded-full motion-safe:animate-pulse" aria-hidden="true" />
                    <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest">
                      AI SYSTEM READY
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative hero visual — hidden from assistive technology */}
              <div className="lg:w-[45%] relative w-full" aria-hidden="true">
                <div className="relative bg-white p-2 rounded-[64px] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border-[16px] border-stone-50/50">
                  <div className="relative aspect-[4/3] rounded-[48px] overflow-hidden bg-stone-100">
                    <img
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                      className="w-full h-full object-cover grayscale opacity-60"
                      alt=""
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-brand-mint/90 backdrop-blur-md text-white rounded-full flex items-center justify-center shadow-2xl">
                        <Wand2 size={36} />
                      </div>
                    </div>
                  </div>

                  {/* floating card — bottom left */}
                  <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[48px] shadow-2xl border border-stone-100/50 hidden xl:flex flex-col gap-8 motion-safe:animate-slide-up">
                    <div className="flex items-center justify-between gap-12">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-brand-mint">
                          <Wand2 size={20} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dracula block">
                            CREATING POST
                          </span>
                          <span className="text-[9px] font-black text-stone-500 uppercase mt-0.5 block">
                            LINKING TO SOCIALS
                          </span>
                        </div>
                      </div>
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-stone-50 border-2 border-white flex items-center justify-center text-pink-500 shadow-sm">
                          <Instagram size={14} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-stone-50 border-2 border-white flex items-center justify-center text-blue-600 shadow-sm">
                          <Facebook size={14} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[9px] font-black text-brand-mint uppercase tracking-widest">
                          BUILDING YOUR POST
                        </span>
                        <span className="text-[9px] font-black text-stone-500 uppercase tracking-widest">
                          92%
                        </span>
                      </div>
                      <div
                        role="progressbar"
                        aria-valuenow={92}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Post building progress: 92%"
                        className="h-2 w-full bg-stone-100 rounded-full overflow-hidden"
                      >
                        <div className="h-full w-[92%] bg-brand-mint shadow-[0_0_10px_rgba(154,126,83,0.3)]" />
                      </div>
                    </div>
                  </div>

                  {/* floating card — top right */}
                  <div className="absolute -top-12 -right-8 bg-white/95 backdrop-blur-md p-6 rounded-[32px] shadow-2xl border border-white/20 hidden xl:flex items-center gap-6 motion-safe:animate-fade-in">
                    <div className="w-12 h-12 bg-brand-mint/10 rounded-2xl flex items-center justify-center text-brand-mint">
                      <Grid size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dracula block">
                        TEMPLATE VAULT
                      </span>
                      <span className="text-[9px] font-black text-green-700 uppercase tracking-widest mt-1 flex items-center gap-1">
                        <Zap size={10} fill="currentColor" /> ACTIVE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* INTAKE FORM SECTION */}
          <IntakeForm />

          {/* FEATURES SECTION */}
          <section id="features" aria-labelledby="features-heading" className="py-40">
            <div className="max-w-[1440px] mx-auto px-10">
              <div className="text-center mb-24">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-stone-700 mb-8">
                  WHY AGENTS LOVE US
                </p>
                <h2 id="features-heading" className="text-6xl font-black tracking-tighter uppercase text-brand-dracula">
                  POST LIKE AN INFLUENCER
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="bg-white p-14 rounded-[56px] border border-stone-200 hover:shadow-2xl hover:shadow-stone-200/40 transition-all duration-700 group flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-brand-mint/5 transition-all" aria-hidden="true">
                      {f.icon}
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-brand-dracula">
                      {f.title}
                    </h3>
                    <p className="text-stone-600 text-sm font-bold leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WORKFLOW SECTION */}
          <section id="workflow" aria-labelledby="workflow-heading" className="py-40 bg-stone-50/30">
            <div className="max-w-[1440px] mx-auto px-10 flex flex-col lg:flex-row gap-24 items-center">
              <div className="lg:w-[45%]">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                    className="rounded-[64px] shadow-2xl grayscale transition-all duration-1000 border-[16px] border-white"
                    alt="Modern residential home exterior representing real estate"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-brand-dracula/5 mix-blend-multiply rounded-[64px]" />
                </div>
              </div>
              <div className="lg:w-[55%] space-y-16">
                <div className="space-y-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-stone-700">
                    SIMPLE 3-STEP PROCESS
                  </p>
                  <h2 id="workflow-heading" className="text-7xl font-black tracking-tighter uppercase text-brand-dracula leading-[0.9]">
                    IDEA <br /> TO POST
                  </h2>
                </div>

                <ol className="space-y-12 list-none">
                  {[
                    {
                      step: '01',
                      title: 'TYPE YOUR IDEA',
                      desc: 'Just describe your listing or local update in your own words. No complicated forms.',
                    },
                    {
                      step: '02',
                      title: 'LET AI CREATE',
                      desc: 'Our system creates the perfect caption, hashtags, and beautiful photos or videos.',
                    },
                    {
                      step: '03',
                      title: 'SEND IT LIVE',
                      desc: 'Review the post and send it to your socials instantly, or schedule it for later.',
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-10 group">
                      <span aria-hidden="true" className="text-5xl font-black text-stone-200 group-hover:text-brand-mint transition-colors duration-500 select-none">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-black text-2xl uppercase tracking-tighter mb-4 text-brand-dracula">
                          {item.title}
                        </h3>
                        <p className="text-stone-600 text-base font-bold leading-relaxed max-w-md">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* PRICING SECTION */}
          <section id="pricing" aria-labelledby="pricing-heading" className="py-48 bg-brand-dracula text-white overflow-hidden relative">
            <div aria-hidden="true" className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-mint/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="max-w-[1440px] mx-auto px-10 relative z-10">
              <div className="text-center mb-24">
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/70 mb-10">
                  INVESTMENT
                </p>
                <h2 id="pricing-heading" className="text-7xl lg:text-[84px] font-black tracking-tighter uppercase mb-10 leading-none">
                  EVERYTHING <br /> UNLIMITED.
                </h2>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                  PRO PLAN — $99/MO
                </p>
              </div>

              <div className="max-w-[580px] mx-auto bg-white/[0.03] backdrop-blur-3xl border border-white/20 rounded-[64px] p-16 lg:p-24 text-center hover:border-brand-mint/30 transition-all duration-700">
                <div className="bg-brand-mint/10 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] w-fit mx-auto mb-12 border border-brand-mint/30">
                  PRO PLAN
                </div>
                <div className="flex items-center justify-center gap-1 mb-6" aria-label="Price: $99 per month, subject to change at launch">
                  <span className="text-3xl font-black text-white/60 mb-8" aria-hidden="true">$</span>
                  <span className="text-9xl font-black tracking-tighter" aria-hidden="true">99</span>
                  <span className="text-white/60 font-black uppercase text-xl mt-12" aria-hidden="true">/MO</span>
                  <span className="text-brand-mint text-2xl font-black self-start mt-4" aria-hidden="true">*</span>
                </div>
                <p className="text-white/70 font-bold mb-16 text-sm">
                  Unlimited posts. No hidden fees.
                </p>

                <ul className="space-y-7 text-left mb-20 max-w-sm mx-auto" aria-label="Plan features">
                  {[
                    'AI-generated social media images and captions.',
                    'Personalized Identity Kit',
                    'Professionally curated template vault',
                    'One click generated content for a month of scheduled posts',
                    'And more',
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-5 text-sm font-bold text-white/90"
                    >
                      <CheckCircle2 size={20} className="text-brand-mint shrink-0" aria-hidden="true" /> {item}
                    </li>
                  ))}
                </ul>

                <span className="block w-full py-8 text-center font-black text-[11px] uppercase tracking-[0.4em] text-white/60">
                  COMING SOON
                </span>
                <p className="text-white/50 text-xs font-bold mt-4">
                  * Subscription pricing subject to change at launch.
                </p>
              </div>
            </div>
          </section>

        </main>

        <Footer />

      </div>
    </>
  );
};

export default LandingPage;
