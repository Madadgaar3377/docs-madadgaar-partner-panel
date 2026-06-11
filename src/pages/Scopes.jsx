import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Callout from '../components/Callout';

const SCOPES = [
  { id: 'installments:read', desc: 'List and get installment products where you are owner or contributor. Cannot create or modify.', endpoints: 'GET /installments, GET /installments/:id' },
  { id: 'installments:write', desc: 'Create products, update fields, delete listings, add/remove your payment plans.', endpoints: 'POST, PUT, DELETE /installments, /plans' },
  { id: 'applications:read', desc: 'List and view customer applications assigned to your partner.', endpoints: 'GET /applications, GET /applications/:id' },
  { id: 'applications:write', desc: 'Approve, reject, or update application status.', endpoints: 'PATCH /applications/:id/status' },
  { id: 'dashboard:read', desc: 'Fetch dashboard statistics (counts, recent items).', endpoints: 'GET /dashboard' },
  { id: 'profile:read', desc: 'Include full partner profile in GET /me response. Always added on new keys.', endpoints: 'GET /me (extended fields)' },
  { id: '*', desc: 'Full access to all partner scopes. Admin-granted only — cannot combine with other scopes.', endpoints: 'All integration routes' },
];

export default function Scopes() {
  return (
    <>
      <SEO
        title="Scopes & Permissions"
        description="Madadgaar Partner API scope reference. Understand installments:read, installments:write, applications scopes, and least-privilege key design."
        canonicalPath="/scopes"
      />
      <PageHero
        badge="Authorization"
        title="Scopes & Permissions"
        subtitle="API keys are least-privilege credentials. Each key carries a list of scopes that gate individual endpoints. Request only what your integration needs."
      />

      <div className="doc-prose">
        <h2>Design philosophy</h2>
        <p>
          Scopes follow the pattern <code>resource:action</code>. Read scopes allow GET requests;
          write scopes allow POST, PUT, PATCH, DELETE. This mirrors industry practice (GitHub, Stripe)
          and lets you issue a read-only key for a reporting server and a write key for your ERP —
          limiting blast radius if one leaks.
        </p>

        <Callout variant="tip" title="Default scopes on create">
          If you omit scopes when creating a key, Madadgaar assigns read-only defaults plus profile:read:
          installments:read, applications:read, dashboard:read, profile:read. You must explicitly enable
          write scopes for mutations.
        </Callout>

        <h2>Scope matrix</h2>
      </div>

      <div className="overflow-x-auto my-6 rounded-xl border border-red-100 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-red-50 text-madad-800">
            <tr>
              <th className="text-left p-3 font-semibold">Scope</th>
              <th className="text-left p-3 font-semibold">What it allows</th>
              <th className="text-left p-3 font-semibold">Endpoints</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-50 bg-white">
            {SCOPES.map((s) => (
              <tr key={s.id} className="hover:bg-red-50/30">
                <td className="p-3 font-mono text-madad-700 font-semibold">{s.id}</td>
                <td className="p-3 text-gray-600">{s.desc}</td>
                <td className="p-3 text-gray-500 font-mono text-xs">{s.endpoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="doc-prose">
        <h2>Recommended key profiles</h2>
        <h3>Catalog sync (read-only)</h3>
        <p><code>installments:read</code>, <code>dashboard:read</code>, <code>profile:read</code></p>
        <h3>CRM lead pull</h3>
        <p><code>applications:read</code>, <code>profile:read</code></p>
        <h3>Full ERP integration</h3>
        <p>All read + write scopes for installments and applications.</p>
      </div>
    </>
  );
}
