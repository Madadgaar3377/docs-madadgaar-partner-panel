import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Callout from '../components/Callout';
import EndpointCard from '../components/EndpointCard';
import { KEYS_BASE, PARTNER_PANEL } from '../constants/api';
import { Link } from 'react-router-dom';

export default function ApiKeysPage() {
  return (
    <>
      <SEO
        title="API Keys"
        description="Create, list, update, and revoke Madadgaar partner API keys. JWT-only key management endpoints with scopes, expiry, and email notifications."
        canonicalPath="/api-keys"
      />
      <PageHero
        badge="JWT only"
        title="API Key Management"
        subtitle="Endpoints under /api/v1/partner/keys require a partner JWT from login. They are used by the partner panel and must never be called with an API key."
      />

      <div className="doc-prose">
        <Callout variant="info" title="UI alternative">
          Most partners manage keys at{' '}
          <a href={`${PARTNER_PANEL}/settings/api-keys`}>{PARTNER_PANEL}/settings/api-keys</a>.
          The HTTP API below is for automation or custom internal tools. See also{' '}
          <Link to="/status">API Status</Link> for what is live in production.
        </Callout>

        <h2>Key format & storage</h2>
        <p>
          Production keys use the prefix <code>mg_live_</code>. The full secret is shown once in the panel,
          included in the confirmation email, and stored in MongoDB as a bcrypt hash only. Download the spec:{' '}
          <a href="https://api.madadgaar.com.pk/api/v1/partner/openapi.json" target="_blank" rel="noreferrer">
            openapi.json
          </a>
          . List endpoints return metadata (name, prefix, scopes, last used) — never the secret.
        </p>
        <p>
          Each key is linked to <code>partnerId</code>. Maximum 10 active keys per partner. Revoking a key
          is immediate  in-flight requests may complete but new requests fail.
        </p>

        <h2>Endpoints</h2>
      </div>

      <EndpointCard
        method="POST"
        path={`${KEYS_BASE}`}
        description="Create a new API key. Returns the full secret in the response and sends a confirmation email to the partner's registered address with the key for lifetime reference."
        curl={`curl -s -X POST "${KEYS_BASE}" \\
  -H "Authorization: Bearer $PARTNER_JWT" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production ERP",
    "scopes": ["installments:read","installments:write","loans:read","loans:write","loan-applications:read","loan-applications:write","profile:read"],
    "expiresAt": null
  }'`}
        test={{
          method: 'POST',
          url: KEYS_BASE,
          headers: { Authorization: 'Bearer YOUR_PARTNER_JWT' },
          body: {
            name: 'Production ERP',
            scopes: ['installments:read', 'installments:write', 'loans:read', 'loans:write', 'loan-applications:read', 'loan-applications:write', 'profile:read'],
            expiresAt: null,
          },
        }}
        response={`{
  "success": true,
  "message": "API key created. Copy it now or check your email...",
  "data": {
    "keyId": "key_abc123",
    "name": "Production ERP",
    "keyPrefix": "mg_live_a8f2",
    "apiKey": "mg_live_a8f2k9XmP4nQ7vR2wL5yH8jT1cB6dF0",
    "scopes": ["installments:read", "installments:write", "loans:read", "loans:write", "loan-applications:read", "loan-applications:write", "profile:read"],
    "status": "active",
    "createdAt": "2026-06-11T10:00:00.000Z",
    "expiresAt": null
  }
}`}
      />

      <EndpointCard
        method="GET"
        path={`${KEYS_BASE}`}
        description="List all API keys for the authenticated partner. Supports optional ?status=active filter."
        curl={`curl -s "${KEYS_BASE}" \\
  -H "Authorization: Bearer $PARTNER_JWT"`}
        test={{ method: 'GET', url: KEYS_BASE, headers: { Authorization: 'Bearer YOUR_PARTNER_JWT' } }}
      />

      <EndpointCard
        method="GET"
        path={`${KEYS_BASE}/:keyId`}
        description="Get metadata for a single key by keyId."
        curl={`curl -s "${KEYS_BASE}/key_abc123" \\
  -H "Authorization: Bearer $PARTNER_JWT"`}
        test={{ method: 'GET', url: `${KEYS_BASE}/key_abc123`, headers: { Authorization: 'Bearer YOUR_PARTNER_JWT' } }}
      />

      <EndpointCard
        method="PATCH"
        path={`${KEYS_BASE}/:keyId`}
        description="Update key name, scopes, or expiry. Cannot update revoked keys. Cannot retrieve the secret  only metadata changes."
        body={`{
  "name": "Renamed Production Key",
  "scopes": ["installments:read", "dashboard:read", "loans:read", "profile:read"]
}`}
        test={{
          method: 'PATCH',
          url: `${KEYS_BASE}/key_abc123`,
          headers: { Authorization: 'Bearer YOUR_PARTNER_JWT' },
          body: {
            name: 'Renamed Production Key',
            scopes: ['installments:read', 'dashboard:read', 'loans:read', 'profile:read'],
          },
        }}
      />

      <EndpointCard
        method="DELETE"
        path={`${KEYS_BASE}/:keyId`}
        description="Revoke a key permanently. Sends a revocation email. Revoked keys cannot be reactivated  create a new key instead."
        curl={`curl -s -X DELETE "${KEYS_BASE}/key_abc123" \\
  -H "Authorization: Bearer $PARTNER_JWT"`}
        test={{ method: 'DELETE', url: `${KEYS_BASE}/key_abc123`, headers: { Authorization: 'Bearer YOUR_PARTNER_JWT' } }}
      />

      <div className="doc-prose">
        <h2>Email notifications</h2>
        <p>
          When a key is created, Madadgaar emails the partner with the full API key, .env example,
          scope list, and links to documentation. When revoked, a security alert email is sent.
          Keep these emails secure  they contain credentials.
        </p>
      </div>
    </>
  );
}
