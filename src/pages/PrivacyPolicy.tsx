import React from 'react';
import Footer from '../components/Footer';
import LegalTopBar from '../components/LegalTopBar';

const Section: React.FC<{ title: string; id?: string; children: React.ReactNode }> = ({
  title,
  id,
  children,
}) => (
  <section id={id} className="mb-12 scroll-mt-24">
    <h2 className="text-xl font-black uppercase tracking-tight text-brand-dracula mb-4">{title}</h2>
    <div className="space-y-4 text-stone-700 text-sm font-bold leading-relaxed">{children}</div>
  </section>
);

const PrivacyPolicy: React.FC = () => (
  <div className="min-h-screen bg-white text-brand-dracula font-sans">
    <LegalTopBar />
    <main className="max-w-[960px] mx-auto px-6 py-14">
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-brand-dracula mb-4">
        Privacy Policy
      </h1>
      <p className="text-sm font-bold text-stone-500 mb-12">
        Last updated: April 27, 2026 · Applies to visitors and users in the United States, with additional disclosures
        for California residents under the California Consumer Privacy Act (CCPA) as amended by the California Privacy
        Rights Act (CPRA) and related regulations.
      </p>

      <Section title="Who we are">
        <p>
          ImageRE LLC (“we,” “us,” or “our”) operates this website and related early-access communications. This policy
          describes how we collect, use, disclose, and otherwise process personal information when you interact with our
          site or sign up for updates.
        </p>
        <p>
          <strong className="text-brand-dracula">Contact for privacy requests (including California rights):</strong>{' '}
          <a className="text-brand-mint underline underline-offset-2 hover:opacity-80" href="mailto:privacy@imagere.com">
            privacy@imagere.com
          </a>
          .
        </p>
      </Section>

      <Section title="What we collect">
        <p>Depending on how you use the site, we may collect:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-brand-dracula">Identifiers & contact details</strong> you submit on forms (for
            example: name, email address, phone number, company or brokerage, job title).
          </li>
          <li>
            <strong className="text-brand-dracula">Communications preferences</strong> such as marketing consent choices
            and team-signup indicators.
          </li>
          <li>
            <strong className="text-brand-dracula">Internet or network activity</strong> such as IP address, browser
            type, device identifiers, referring/exit pages, and timestamps, which our hosting and infrastructure
            providers may log when you load pages or submit forms.
          </li>
          <li>
            <strong className="text-brand-dracula">Cookies and similar technologies</strong> as described below and in
            our cookie banner.
          </li>
        </ul>
      </Section>

      <Section title="How we use personal information">
        <ul className="list-disc pl-6 space-y-2">
          <li>To operate, secure, and improve the website and our services.</li>
          <li>To respond to early-access and contact requests and to send transactional messages.</li>
          <li>
            With your consent where required, to send marketing or product updates consistent with what you opted into.
          </li>
          <li>To comply with law, protect rights and safety, and enforce our Terms of Service.</li>
          <li>To understand site traffic and campaign performance when you allow optional analytics or advertising tools.</li>
        </ul>
      </Section>

      <Section title="Sources">
        <p>
          We collect personal information directly from you, automatically through your device and browsers, and in
          some cases from service providers who help us host, deliver, or secure the site.
        </p>
      </Section>

      <Section title="Disclosure of personal information — service providers & third parties">
        <p>We share personal information with companies that process it on our behalf under contract, including:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-brand-dracula">Hosting and infrastructure</strong> (for example, deployment
            platforms such as Vercel or similar) to deliver the site and store server logs.
          </li>
          <li>
            <strong className="text-brand-dracula">Form processing and productivity tools</strong> — for example, Google
            services (such as Google Apps Script / Google Sheets) used to route waitlist submissions you send through
            our early-access form, subject to Google’s terms and privacy policies.
          </li>
          <li>
            <strong className="text-brand-dracula">Analytics or advertising partners</strong> when we enable those
            tools and you consent to non-essential cookies — for example, product analytics or advertising pixels such as
            Meta or Google Ads, if implemented.
          </li>
        </ul>
        <p>
          We do not sell your personal information for money. Some data sharing for cross-context behavioral advertising
          may be treated as “sharing” under California law; where that applies, we provide a “Do Not Sell or Share My
          Personal Information” choice and honor opt-out preference signals as described below.
        </p>
      </Section>

      <Section title="Cookies and similar technologies">
        <p>
          We use strictly necessary cookies and similar technologies needed for the site to function. Optional
          analytics or advertising tags load only after you affirmatively choose “Accept all” in our cookie banner
          (subject to updates as we wire specific tools). Closing the banner without making a selection does{' '}
          <em>not</em> count as consent to non-essential cookies.
        </p>
      </Section>

      <Section title="Automated decision-making technology (ADMT) & artificial intelligence">
        <p>
          California privacy regulations require transparency when businesses use Automated Decision-Making Technology or
          artificial intelligence in certain ways that substantially affect consumers.
        </p>
        <p>
          <strong className="text-brand-dracula">This marketing website:</strong> It does not include a generative-AI
          chatbot or other interactive AI that replies to you in real time. Descriptions of future product features refer
          to AI capabilities planned for our application; those features are not activated for you solely by browsing this
          page.
        </p>
        <p>
          <strong className="text-brand-dracula">Waitlist and inquiries:</strong> We may use software (including AI
          tools in the future) to help organize, summarize, or route inbound messages. We do not use automated processing
          as the sole basis to deny housing, employment, credit, or other legally protected decisions without appropriate
          human oversight where required by law.
        </p>
        <p>
          <strong className="text-brand-dracula">Future product:</strong> When our product uses generative AI or similar
          technologies to create content on your behalf, we will provide additional in-product disclosures consistent with
          California’s AI transparency requirements.
        </p>
      </Section>

      <Section title="California privacy rights (CCPA / CPRA)" id="california-rights">
        <p>If you are a California resident, you may have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Know what personal information we collect, use, disclose, and retain.</li>
          <li>Request deletion of personal information, subject to exceptions.</li>
          <li>Correct inaccurate personal information.</li>
          <li>
            Opt out of the “sale” or “sharing” of personal information (including sharing for cross-context behavioral
            advertising), including through a preference signal such as Global Privacy Control.
          </li>
          <li>Limit use of sensitive personal information where applicable.</li>
          <li>Not receive discriminatory treatment for exercising these rights.</li>
        </ul>
        <p>
          You or an authorized agent may submit a request using the contact email above. We may need to verify your
          identity before fulfilling certain requests.
        </p>
      </Section>

      <Section title="Global Privacy Control (GPC)" id="gpc">
        <p>
          When your browser sends a valid Global Privacy Control signal, we treat it as an opt-out of sale/sharing for
          that browser, per CPRA regulations. Our site applies restricted non-essential data processing by default when
          GPC is detected and you have not previously stored a different choice.
        </p>
      </Section>

      <Section title='Do not sell or share my personal information' id="do-not-sell-or-share">
        <p>
          California residents may opt out of the “sale” or “sharing” of personal information as defined under the CPRA.
          You can exercise that choice in a manner at least as easy as signing up:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Use the same cookie banner controls as other visitors: choose{' '}
            <strong className="text-brand-dracula">Reject non-essential</strong> — one click, comparable to accepting.
          </li>
          <li>
            Enable Global Privacy Control in a supported browser; we honor the signal automatically as described above.
          </li>
          <li>
            Email{' '}
            <a className="text-brand-mint underline underline-offset-2 hover:opacity-80" href="mailto:privacy@imagere.com">
              privacy@imagere.com
            </a>{' '}
            with “CPRA Opt-Out” in the subject line.
          </li>
        </ul>
      </Section>

      <Section title="Security practices" id="security-practices">
        <p>
          We use reasonable administrative, technical, and organizational measures designed to protect personal
          information. No method of transmission over the Internet is completely secure.
        </p>
      </Section>

      <Section title="Retention">
        <p>
          We retain personal information only as long as needed for the purposes described in this policy, unless a
          longer period is required or permitted by law.
        </p>
      </Section>

      <Section title="Children">
        <p>
          This site is not directed to children under 16, and we do not knowingly sell or share personal information of
          minors under 16.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. The “Last updated” date at the top will change when we do.
          Continued use of the site after changes means you acknowledge the revised policy.
        </p>
      </Section>

      <p className="text-xs font-bold text-stone-500 border-t border-stone-200 pt-10">
        This policy is provided for informational purposes and does not constitute legal advice. Have qualified counsel
        review your final text, especially before scaling marketing, analytics, or the full product.
      </p>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
