import React from 'react';
import Footer from '../components/Footer';
import LegalTopBar from '../components/LegalTopBar';

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-xl font-black uppercase tracking-tight text-brand-dracula mb-4">{title}</h2>
    <div className="space-y-4 text-stone-700 text-sm font-bold leading-relaxed">{children}</div>
  </section>
);

const TermsOfService: React.FC = () => (
  <div className="min-h-screen bg-white text-brand-dracula font-sans">
    <LegalTopBar />
    <main className="max-w-[960px] mx-auto px-6 py-14">
      <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-brand-dracula mb-4">
        Terms of Service
      </h1>
      <p className="text-sm font-bold text-stone-500 mb-12">Last updated: April 27, 2026</p>

      <Block title="Agreement">
        <p>
          These Terms of Service (“Terms”) govern your access to and use of the website operated by ImageRE LLC and any waitlist or
          contact forms we make available at this domain (collectively, the “Site”). By using the Site, you agree to
          these Terms and our Privacy Policy.
        </p>
      </Block>

      <Block title="No product availability yet">
        <p>
          The Site may describe planned product features that are not yet generally available. “Coming soon,” pricing
          previews, and similar statements are estimates and subject to change. We do not guarantee release dates or
          final pricing.
        </p>
      </Block>

      <Block title="Eligibility">
        <p>You must be at least 18 years old (or the age of majority in your jurisdiction) to use the Site.</p>
      </Block>

      <Block title="Accounts and communications">
        <p>
          If you submit information through our forms, you represent that it is accurate. You agree that we may contact
          you regarding products and services offered by ImageRE LLC in line with your consent choices and applicable law.
        </p>
      </Block>

      <Block title="Intellectual property">
        <p>
          The Site, branding, text, graphics, and other materials are owned by ImageRE LLC or our licensors and are protected
          by intellectual property laws. Except for temporary copies needed to browse the Site, you may not copy, modify,
          or distribute our materials without permission.
        </p>
      </Block>

      <Block title="Prohibited conduct">
        <p>You agree not to misuse the Site — for example, by attempting unauthorized access, scraping in violation of
          our robots.txt or applicable law, introducing malware, or harassing our team or other users.</p>
      </Block>

      <Block title="Disclaimer of warranties">
        <p>
          THE SITE AND ALL CONTENT ARE PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE FULLEST EXTENT PERMITTED BY LAW, ImageRE LLC
          DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT.
        </p>
      </Block>

      <Block title="Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY CALIFORNIA LAW, ImageRE LLC AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AND SUPPLIERS
          WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF
          PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SITE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
          DAMAGES. OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF THESE TERMS OR THE SITE WILL NOT EXCEED THE GREATER OF
          ONE HUNDRED U.S. DOLLARS (US $100) OR THE AMOUNTS YOU PAID TO US FOR THE SPECIFIC SERVICE GIVING RISE TO THE
          CLAIM DURING THE TWELVE (12) MONTHS BEFORE THE CLAIM (WHICH MAY BE ZERO FOR FREE WAITLIST USE).
        </p>
        <p>
          SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS; IN THOSE CASES, OUR LIABILITY IS LIMITED TO THE MINIMUM
          ALLOWED BY LAW.
        </p>
      </Block>

      <Block title="Indemnity">
        <p>
          You will defend and indemnify ImageRE LLC against claims, damages, losses, and expenses (including reasonable
          attorneys’ fees) arising from your misuse of the Site or violation of these Terms, except to the extent caused
          by our intentional misconduct or gross negligence.
        </p>
      </Block>

      <Block title="Governing law">
        <p>
          These Terms are governed by the laws of the State of California, without regard to conflict-of-law principles
          that would require applying another jurisdiction’s laws, except as required by mandatory consumer protections
          in your place of residence.
        </p>
      </Block>

      <Block title="Dispute resolution & arbitration">
        <p>
          Except for claims that qualify for small-claims court (where you or we may elect to bring an individual action
          in small-claims court in your county of residence or in Orange County, California), any dispute arising out of
          or relating to these Terms or the Site will be resolved by binding arbitration administered by the American
          Arbitration Association under its Consumer Arbitration Rules, as modified by this section. The arbitration will
          be held in California or remotely at your election. <strong className="text-brand-dracula">You and ImageRE LLC
          agree to bring claims only in an individual capacity, not as a plaintiff or class member in any class or
          representative proceeding.</strong> The arbitrator may not consolidate more than one person’s claims and may not
          preside over any form of a class or representative proceeding. If this class-action waiver is found
          unenforceable, the arbitration provision is void as to that dispute.
        </p>
        <p>
          <strong className="text-brand-dracula">Right to opt out:</strong> You may opt out of this arbitration agreement
          by emailing us within thirty (30) days of first accepting these Terms at{' '}
          <a className="text-brand-mint underline underline-offset-2 hover:opacity-80" href="mailto:imagerewebapp@gmail.com">
            imagerewebapp@gmail.com
          </a>{' '}
          with “Arbitration Opt-Out” in the subject line and your name and mailing address in the body.
        </p>
        <p className="text-xs font-bold text-stone-500">
          Arbitration clauses involve legal trade-offs (speed vs. courtroom procedures). Have counsel review before
          publishing final Terms.
        </p>
      </Block>

      <Block title="Changes">
        <p>
          We may modify these Terms by posting an updated version on the Site. Material changes may also be communicated
          where appropriate. Continued use after changes become effective constitutes acceptance.
        </p>
      </Block>

      <Block title="Contact">
        <p>
          Questions about these Terms:{' '}
          <a className="text-brand-mint underline underline-offset-2 hover:opacity-80" href="mailto:imagerewebapp@gmail.com">
            imagerewebapp@gmail.com
          </a>
        </p>
      </Block>
    </main>
    <Footer />
  </div>
);

export default TermsOfService;
