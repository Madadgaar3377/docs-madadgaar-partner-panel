import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Callout from '../components/Callout';
import { PARTNER_V1, PARTNER_PANEL } from '../constants/api';

const LIVE = [
  { area: 'API key CRUD', path: '/api/v1/partner/keys', auth: 'JWT', note: 'Create, list, revoke; email on create/revoke' },
  { area: 'GET /me', path: `${PARTNER_V1}/me`, auth: 'API key', note: 'Health check; full profile with profile:read' },
  { area: 'Installments CRUD', path: `${PARTNER_V1}/installments`, auth: 'API key', note: 'List, create, get, update, delete, plans' },
  { area: 'Loans CRUD', path: `${PARTNER_V1}/loans`, auth: 'API key', note: 'List, create, get, update, delete loan plans' },
  { area: 'Installment applications', path: `${PARTNER_V1}/applications`, auth: 'API key', note: 'List, detail, approve/reject, delete' },
  { area: 'Loan applications', path: `${PARTNER_V1}/loan-applications`, auth: 'API key', note: 'List, detail, approve/reject, delete' },
  { area: 'Dashboard', path: `${PARTNER_V1}/dashboard`, auth: 'API key', note: 'Same stats as partner panel' },
  { area: 'OpenAPI spec', path: `${PARTNER_V1}/openapi.json`, auth: 'Public', note: 'Import to Postman or Swagger' },
  { area: 'Rate limits', path: 'All integration routes', auth: 'API key', note: '100 req/min; 20 writes/min per key' },
  { area: 'Audit logs', path: '/api/admin/partner-api/*', auth: 'Admin JWT', note: 'Usage stats + request log' },
  { area: 'Partner panel UI', path: `${PARTNER_PANEL}/settings/api-keys`, auth: 'JWT', note: 'Generate keys + link to docs' },
];

const PLANNED = [
  { area: 'Admin panel UI for API usage', path: '', note: 'Charts in admin dashboard (API ready)' },
  { area: 'Sandbox mg_test keys', path: '', note: 'Optional test environment' },
  { area: 'IP allowlist per key', path: '', note: 'Enterprise security option' },
  { area: 'Public apply token', path: '/api/v1/public/apply', note: 'Apply from partner site without Madadgaar login' },
];

export default function Status() {
  return (
    <>
      <SEO
        title="API Status & Roadmap"
        description="Madadgaar Partner API implementation status: live endpoints, rate limits, audit logs, OpenAPI, and Postman collection."
        canonicalPath="/status"
      />
      <PageHero
        badge="Updated"
        title="API Status & Roadmap"
        subtitle="Installments, loans, applications, OpenAPI, Postman, rate limits, and audit logs are live on the backend."
      />

      <div className="doc-prose">
        <Callout variant="success" title="Production-ready">
          Partners can manage installments, loans, and applications via API key, with rate limiting and admin audit visibility.
          Download the{' '}
          <a href={`${PARTNER_V1}/openapi.json`} target="_blank" rel="noreferrer">OpenAPI spec</a> or import the Postman collection from the backend repo.
        </Callout>

        <h2>Live in production</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-green-100 mb-8">
          <table className="w-full text-sm">
            <thead className="bg-green-50 text-gray-600">
              <tr>
                <th className="text-left p-3 font-semibold">Feature</th>
                <th className="text-left p-3 font-semibold">Path</th>
                <th className="text-left p-3 font-semibold">Auth</th>
                <th className="text-left p-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-50 bg-white">
              {LIVE.map((row) => (
                <tr key={row.area}>
                  <td className="p-3 font-semibold text-gray-900">{row.area}</td>
                  <td className="p-3 font-mono text-xs text-madad-700 break-all">{row.path}</td>
                  <td className="p-3 text-gray-600">{row.auth}</td>
                  <td className="p-3 text-gray-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Planned next</h2>
        <div className="not-prose overflow-x-auto rounded-xl border border-amber-100 mb-8">
          <table className="w-full text-sm">
            <thead className="bg-amber-50 text-gray-600">
              <tr>
                <th className="text-left p-3 font-semibold">Feature</th>
                <th className="text-left p-3 font-semibold">Path</th>
                <th className="text-left p-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50 bg-white">
              {PLANNED.map((row) => (
                <tr key={row.area}>
                  <td className="p-3 font-semibold text-gray-900">{row.area}</td>
                  <td className="p-3 font-mono text-xs text-gray-600 break-all">{row.path}</td>
                  <td className="p-3 text-gray-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Developer resources</h2>
        <ul>
          <li><strong>OpenAPI:</strong> <a href={`${PARTNER_V1}/openapi.json`} target="_blank" rel="noreferrer">{PARTNER_V1}/openapi.json</a></li>
          <li><strong>Postman:</strong> <code>backend-Nodejs-Express/thirdPartyApis/postman/Madadgaar-Partner-API.postman_collection.json</code></li>
          <li><strong>Backend README:</strong> <code>backend-Nodejs-Express/thirdPartyApis/README.md</code></li>
          <li><strong>Admin usage API:</strong> <code>GET /api/admin/partner-api/usage?days=7</code></li>
        </ul>

        <h2>Setup checklist</h2>
        <ol>
          <li>Complete partner profile and get admin approval</li>
          <li>Open <a href={`${PARTNER_PANEL}/settings/api-keys`} target="_blank" rel="noreferrer">API Keys</a> → Generate Key with needed scopes</li>
          <li>Installments: test <code>GET {PARTNER_V1}/applications?status=pending</code>  see <Link to="/applications">Installment applications</Link></li>
          <li>Loans: test <code>GET {PARTNER_V1}/loans</code> and <code>GET {PARTNER_V1}/loan-applications?status=pending</code>  see <Link to="/loans">Loans</Link> and <Link to="/loan-applications">Loan applications</Link></li>
          <li>Customers apply for loans via <code>POST /api/applyLoan</code> (customer JWT)  documented on <Link to="/loans">Loans</Link> page</li>
        </ol>
      </div>
    </>
  );
}
