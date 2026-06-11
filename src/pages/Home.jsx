import { Link } from 'react-router-dom';
import { ArrowRight, Key, Layers, Clock, Mail, Server } from 'lucide-react';
import SEO from '../components/SEO';
import Callout from '../components/Callout';
import { PARTNER_V1, PARTNER_PANEL } from '../constants/api';

export default function Home() {
  return (
    <>
      <SEO
        title="Overview"
        description="Official Madadgaar Partner API documentation. Connect your website, ERP, or custom panel to manage installments and applications with secure API keys."
        canonicalPath="/"
      />

      <section className="hero-mesh border border-red-100 rounded-2xl p-8 sm:p-10 mb-10 text-center">
        <img src="/madadgaar-logo.png" alt="Madadgaar Expert Partner" className="h-16 sm:h-20 mx-auto mb-6 object-contain" />
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
          Partner API <span className="text-madad-600">Documentation</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Everything you need to connect your business systems to Madadgaar — explained step by step,
          with copy-paste examples. No black-box magic: same rules as the partner panel, built for your servers.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/getting-started" className="inline-flex items-center gap-2 px-6 py-3 bg-madad-600 hover:bg-madad-700 text-white font-semibold rounded-xl shadow-md transition-colors">
            Start in 5 minutes <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/examples" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-madad-600 text-madad-700 font-semibold rounded-xl hover:bg-red-50 transition-colors">
            Code examples
          </Link>
        </div>
      </section>

      <div className="doc-prose">
        <Callout variant="learn" title="Who should read this?">
          <strong>Verified Madadgaar partners</strong> who want to automate work: sync products to their website,
          pull customer applications into a CRM, update listings from an ERP, or build a custom admin tool.
          If you only use the partner panel in a browser, you do not need the API — but if you have developers
          on your team, this documentation will save weeks of guesswork.
        </Callout>

        <h2>What problem does the API solve?</h2>
        <p>
          Today, partners log into <a href={PARTNER_PANEL} target="_blank" rel="noreferrer">partner.madadgaar.com.pk</a> to
          create products, check requests, and update statuses. That works for humans, but not for automation.
          Your warehouse system cannot click buttons. Your website cannot log in every night to copy products.
        </p>
        <p>
          The Partner API gives your <strong>server</strong> a secure key (<code>mg_live_...</code>) that acts on
          behalf of your partner account. Your code calls REST endpoints; Madadgaar responds with JSON. The same
          validation, ownership rules, and admin approval flows apply — you are not bypassing anything, you are
          automating the same actions you already perform manually.
        </p>

        <h2>How it works — simple picture</h2>
        <div className="grid sm:grid-cols-3 gap-4 my-8 not-prose">
          {[
            { icon: Key, title: '1. Get API key', desc: 'Generate in partner panel Settings → API Keys. Key is emailed to you for safekeeping.', to: '/api-keys' },
            { icon: Server, title: '2. Store on server', desc: 'Put key in .env on your backend. Never in website JavaScript or mobile apps.', to: '/security' },
            { icon: Layers, title: '3. Call endpoints', desc: 'List products, create listings, check applications — from your own systems.', to: '/installments' },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.to} to={card.to} className="glass-card p-6 text-center group">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-madad-600 transition-colors">
                  <Icon className="w-6 h-6 text-madad-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </Link>
            );
          })}
        </div>

        <h2>Two types of URLs — important!</h2>
        <p>
          Madadgaar uses <strong>two separate URL groups</strong>. Mixing them causes errors. Think of it like:
          one key opens the office (JWT login), another key opens the warehouse (API key).
        </p>
        <div className="overflow-x-auto not-prose my-6">
          <table className="w-full text-sm border border-red-100 rounded-xl overflow-hidden">
            <thead className="bg-red-50 text-madad-800">
              <tr>
                <th className="text-left p-3 font-bold">Group</th>
                <th className="text-left p-3 font-bold">URL</th>
                <th className="text-left p-3 font-bold">Login type</th>
                <th className="text-left p-3 font-bold">Used for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-50">
              <tr className="bg-white"><td className="p-3 font-semibold">A — Keys</td><td className="p-3 font-mono text-xs">/api/v1/partner/keys</td><td className="p-3">Partner JWT</td><td className="p-3 text-gray-600">Create & revoke API keys only</td></tr>
              <tr className="bg-white"><td className="p-3 font-semibold">B — Integration</td><td className="p-3 font-mono text-xs">{PARTNER_V1}</td><td className="p-3">API key</td><td className="p-3 text-gray-600">Installments, dashboard, applications</td></tr>
            </tbody>
          </table>
        </div>

        <h2>What you can do today</h2>
        <ul>
          <li><strong>API keys</strong> — create, list, revoke, email confirmation with full key</li>
          <li><strong>Installments</strong> — full create, read, update, delete (same as partner panel)</li>
          <li><strong>Dashboard</strong> — stats and <code>GET /me</code> health check</li>
          <li><strong>Applications</strong> — documented; confirm enablement with Madadgaar support</li>
        </ul>

        <div className="grid sm:grid-cols-2 gap-4 my-8 not-prose">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
            <Clock className="w-5 h-5 text-madad-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Average setup time</p>
              <p className="text-xs text-gray-500 mt-1">15–30 minutes for first successful API call if partner is already verified.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
            <Mail className="w-5 h-5 text-madad-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Key sent by email</p>
              <p className="text-xs text-gray-500 mt-1">Full API key emailed when generated — save for lifetime reference.</p>
            </div>
          </div>
        </div>

        <Callout variant="tip" title="New to APIs?">
          Start with <Link to="/getting-started">Getting Started</Link> — we walk you through every click and command.
          No prior API experience required; we explain what JWT, scopes, and environment variables mean in plain language.
        </Callout>
      </div>
    </>
  );
}
