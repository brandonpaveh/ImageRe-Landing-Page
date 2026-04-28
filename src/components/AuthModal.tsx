import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'signin' | 'signup';
}

// ─── Point these at your actual app URL ───────────────────────────────────────
const APP_URL = 'https://your-app-url.com'; // e.g. https://app.imagere.ai
// ──────────────────────────────────────────────────────────────────────────────

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  mode: initialMode = 'signup',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, _setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGoogleAuth = () => {
    // Redirect to main app for Google auth
    window.location.href = `${APP_URL}?provider=google&mode=${mode}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Option A: redirect to main app with prefilled email
      window.location.href = `${APP_URL}?email=${encodeURIComponent(email)}&mode=${mode}`;

      // Option B: call your own API endpoint instead
      // const res = await fetch('/api/auth', { method: 'POST', body: JSON.stringify({ email, password, mode }) });
      // if (!res.ok) throw new Error('Authentication failed');
      // setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dracula/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-[48px] shadow-[0_50px_100px_rgba(0,0,0,0.15)] overflow-hidden relative border border-white/10 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-2 bg-stone-50 hover:bg-stone-100 rounded-full text-stone-400 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-12 lg:p-14">
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-brand-mint rounded-xl flex items-center justify-center text-white text-lg font-black shadow-lg shadow-brand-mint/20">
                I
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-brand-dracula">
                ImageRE LLC
              </span>
            </div>
            <p className="text-stone-300 text-[10px] font-black uppercase tracking-[0.3em]">
              {mode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
              <p className="text-xs font-bold text-red-600 text-center">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl">
              <p className="text-xs font-bold text-green-600 text-center">
                You're on the list! We'll be in touch soon.
              </p>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <button
              onClick={handleGoogleAuth}
              className="flex items-center justify-center gap-4 w-full py-4 bg-white border-2 border-stone-50 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-sm hover:bg-stone-50 transition-all"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="Google"
              />
              {mode === 'signup' ? 'SIGN UP WITH GOOGLE' : 'SIGN IN WITH GOOGLE'}
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-100"></div>
            </div>
            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-widest text-stone-200">
              <span className="px-4 bg-white">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">
                EMAIL
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-5 bg-stone-50 border-0 rounded-[24px] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-mint/10 transition-all shadow-inner"
                placeholder="agent@imagere.ai"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">
                PASSWORD
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-5 bg-stone-50 border-0 rounded-[24px] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-brand-mint/10 transition-all shadow-inner"
                placeholder="••••••••"
              />
              {mode === 'signup' && (
                <p className="text-[9px] text-stone-400 ml-2 mt-1">Minimum 6 characters</p>
              )}
            </div>

            <div className="flex flex-col items-center gap-4 mt-8">
              <button
                type="button"
                onClick={toggleMode}
                className="text-[10px] font-black text-stone-300 hover:text-brand-mint transition-colors uppercase tracking-[0.2em] underline underline-offset-4 decoration-stone-200 hover:decoration-brand-mint"
              >
                {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 rounded-[28px] bg-brand-mint text-white font-black text-[11px] uppercase tracking-[0.4em] hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-brand-mint/30 disabled:opacity-70 active:scale-[0.98]"
              >
                {isLoading
                  ? 'PROCESSING...'
                  : mode === 'signup'
                  ? 'CREATE ACCOUNT'
                  : 'SIGN IN'}
                {!isLoading && <ArrowRight size={20} />}
              </button>
            </div>
          </form>

          <div className="mt-12 text-center text-[9px] font-black text-stone-200 uppercase tracking-[0.2em]">
            IDENTITY VERIFICATION IS ENCRYPTED AND SECURE.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
