import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CookieConsentBanner from './components/CookieConsentBanner';
import LandingPage from './components/LandingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

/** Normalize Vite `import.meta.env.BASE_URL` (often `/` or `/subdir/`) for react-router basename. */
function routerBasename(): string {
  const raw = import.meta.env.BASE_URL;
  if (!raw || raw === '/') return '/';
  const trimmed = raw.endsWith('/') ? raw.slice(0, -1) : raw;
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

const App: React.FC = () => (
  <BrowserRouter basename={routerBasename()}>
    <CookieConsentBanner />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
