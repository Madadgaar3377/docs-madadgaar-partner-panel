import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Callout from '../components/Callout';
import CodeBlock from '../components/CodeBlock';
import { PARTNER_V1, KEYS_BASE, API_BASE } from '../constants/api';

export default function Authentication() {
  return (
    <>
      <SEO
        title="Authentication"
        description="Deep guide to Madadgaar Partner API authentication: JWT for key management, API keys for integration, header formats, and verification flow."
        canonicalPath="/authentication"
      />
      <PageHero
        badge="Core concept"
        title="Authentication"
        subtitle="Madadgaar uses two separate authentication modes. Understanding when to use each one is critical for a secure and working integration."
      />

      <div className="doc-prose">
        <h2>Why two auth modes exist</h2>
        <p>
          Human partners use browsers. Browsers need session tokens (JWT) that expire and can be revoked on logout.
          Automated systems need long-lived credentials (API keys) that survive server restarts and run without
          a human present. Mixing these in one header type caused confusion in early designs, so Madadgaar
          splits them by URL path.
        </p>

        <h2>Mode A  Partner JWT (browser / key management only)</h2>
        <p>
          Obtain a JWT by logging in through <code>POST {API_BASE}/login</code> with partner credentials.
          Send it as <code>Authorization: Bearer &lt;jwt&gt;</code> only to:
        </p>
        <ul>
          <li><code>{KEYS_BASE}</code>  create, list, update, revoke keys</li>
          <li>Legacy partner panel endpoints (dashboard, profile) when using the panel UI</li>
        </ul>
        <Callout variant="warning" title="Never use JWT for integration">
          JWTs expire, are tied to a browser session, and grant broad account access. Do not put them in cron jobs,
          ERP connectors, or customer-facing websites. Use API keys for all server-to-server work.
        </Callout>

        <h2>Mode B  API key (integration)</h2>
        <p>
          API keys start with <code>mg_live_</code> followed by a cryptographically random string.
          They are created in the partner panel or via the keys API, hashed with bcrypt in the database,
          and scoped to specific permissions. Send them to <code>{`${PARTNER_V1}/*`}</code> using either header:
        </p>
        <CodeBlock title="headers">{`Authorization: Bearer mg_live_xxxxxxxx
# OR
X-API-Key: mg_live_xxxxxxxx`}</CodeBlock>
        <p>
          The middleware inspects the token: if it starts with <code>mg_live_</code> (or future <code>mg_test_</code>),
          it is treated as an API key. Otherwise a Bearer token is assumed to be a JWT and routed to user auth 
          which will fail on integration paths.
        </p>

        <h2>Verification flow (step by step)</h2>
        <ol>
          <li>Extract key from <code>Authorization: Bearer</code> or <code>X-API-Key</code>.</li>
          <li>Read first 12 characters as <code>keyPrefix</code> for database lookup.</li>
          <li>Compare full secret against bcrypt hash (timing-safe).</li>
          <li>Check key status is <code>active</code> and not past <code>expiresAt</code>.</li>
          <li>Load partner user  must be verified, active, not blocked.</li>
          <li>Attach <code>partnerId</code> and scopes to the request context.</li>
          <li>Check route-required scope (e.g. <code>installments:write</code>).</li>
          <li>Update <code>lastUsedAt</code> for audit.</li>
        </ol>

        <h2>Identity resolution</h2>
        <p>
          Every integration request resolves to <code>partnerId</code> (= <code>User.userId</code>).
          Controllers use this ID for ownership checks  you cannot create products for another partner
          even if you tamper with <code>userId</code> in the JSON body; the server overwrites it from the key.
        </p>

        <h2>Common errors</h2>
        <ul>
          <li><strong>401 Invalid or expired API key</strong>  wrong secret, revoked key, or expired key.</li>
          <li><strong>403 Insufficient scope</strong>  key lacks permission for this endpoint.</li>
          <li><strong>403 Partner account not allowed</strong>  unverified or blocked partner.</li>
        </ul>
      </div>
    </>
  );
}
