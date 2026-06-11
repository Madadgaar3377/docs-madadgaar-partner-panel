import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import EndpointCard from '../components/EndpointCard';
import { PARTNER_V1 } from '../constants/api';

export default function DashboardPage() {
  return (
    <>
      <SEO
        title="Dashboard & Profile"
        description="Madadgaar Partner API endpoints for dashboard statistics and profile verification via GET /me and GET /dashboard."
        canonicalPath="/dashboard"
      />
      <PageHero
        badge="API key"
        title="Dashboard & Profile"
        subtitle="Fetch aggregate stats for your partner account and verify that an API key is valid before deploying to production."
      />

      <div className="doc-prose">
        <h2>GET /me  health check</h2>
        <p>
          The <code>/me</code> endpoint is the recommended first call after creating a key. It confirms
          the secret is valid, the partner account is active, and returns metadata about the key itself.
          Any valid API key can call this endpoint regardless of scopes. If the key includes{' '}
          <code>profile:read</code>, the response also contains partner name, email, and company details.
        </p>
      </div>

      <EndpointCard
        method="GET"
        path={`${PARTNER_V1}/me`}
        description="Verify API key and return partnerId plus key metadata. Optional full profile with profile:read scope."
        curl={`curl -s "${PARTNER_V1}/me" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
        test={{ method: 'GET', url: `${PARTNER_V1}/me` }}
        response={`{
  "success": true,
  "message": "API key is valid",
  "data": {
    "partnerId": "partner_user_id",
    "name": "Company Contact",
    "email": "partner@example.com",
    "companyName": "Example (Pvt) Ltd",
    "apiKey": {
      "keyId": "key_abc123",
      "name": "Production",
      "keyPrefix": "mg_live_a8f2",
      "scopes": ["installments:read", "profile:read"]
    }
  }
}`}
      />

      <div className="doc-prose">
        <h2>GET /dashboard  partner statistics</h2>
        <p>
          Returns the same statistics shown on the partner panel dashboard: total installments (owned vs
          contributed), installment request count, properties, loans, and recent activity snippets.
          Requires <code>dashboard:read</code> scope.
        </p>
      </div>

      <EndpointCard
        method="GET"
        path={`${PARTNER_V1}/dashboard`}
        scope="dashboard:read"
        description="Partner dashboard stats  installments, requests, properties, loans."
        curl={`curl -s "${PARTNER_V1}/dashboard" \\
  -H "X-API-Key: $MADADGAAR_API_KEY"`}
        test={{ method: 'GET', url: `${PARTNER_V1}/dashboard` }}
        response={`{
  "success": true,
  "data": {
    "stats": {
      "totalInstallments": 12,
      "ownedInstallments": 8,
      "contributedInstallments": 4,
      "totalInstallmentRequests": 45,
      "totalProperties": 0,
      "totalLoans": 0
    },
    "recent": { "recentInstallments": [], "recentProperties": [] }
  }
}`}
      />
    </>
  );
}
