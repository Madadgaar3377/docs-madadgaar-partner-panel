import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Callout from '../components/Callout';

export default function Security() {
  return (
    <>
      <SEO
        title="Security"
        description="Madadgaar Partner API security: bcrypt key storage, HTTPS, scope enforcement, rate limits, key rotation, and incident response."
        canonicalPath="/security"
      />
      <PageHero
        badge="Best practices"
        title="Security"
        subtitle="How Madadgaar protects partner API keys and what you must do on your side to keep integrations safe."
      />

      <div className="doc-prose">
        <h2>How keys are stored</h2>
        <p>
          Plain API secrets never persist in the database. On creation, Madadgaar generates a
          <code>mg_live_</code> token, returns it once, emails it to the partner, and stores only:
        </p>
        <ul>
          <li><code>keyPrefix</code>  first 12 characters for indexed lookup</li>
          <li><code>keyHash</code>  bcrypt (12 rounds) of the full secret</li>
          <li>Metadata  name, scopes, partnerId, status, expiry, lastUsedAt</li>
        </ul>
        <p>Verification uses constant-time bcrypt comparison. Revoked keys fail immediately.</p>

        <h2>Transport security</h2>
        <p>
          Production API requires HTTPS. Do not call <code>api.madadgaar.com.pk</code> over plain HTTP.
          Pin TLS in high-security environments if your compliance team requires it.
        </p>

        <h2>Partner account gates</h2>
        <p>Even with a valid key, requests fail if the partner account is:</p>
        <ul>
          <li>Not admin-verified (<code>isVerified = false</code>)</li>
          <li>Email not verified</li>
          <li>Blocked or deactivated</li>
          <li>Wrong account type (not a partner)</li>
        </ul>

        <h2>Ownership enforcement</h2>
        <p>
          Every write operation checks that resources belong to the <code>partnerId</code> from the API key.
          The server overwrites <code>userId</code> in create payloads  spoofing another partner is ignored.
          Application and installment reads filter by <code>createdBy</code> / plan ownership.
          Loan applications filter by <code>planId</code> on plans you created. Loan plans filter by <code>createdBy</code>.
        </p>

        <h2>Rate limits (proposed production)</h2>
        <ul>
          <li><strong>Per API key:</strong> 100 requests / minute</li>
          <li><strong>Per partner (all keys):</strong> 500 requests / minute</li>
          <li><strong>Create/update installment or loan:</strong> 20 requests / minute</li>
        </ul>
        <p>Exceeding limits returns <code>429 Too Many Requests</code>. Implement exponential backoff in clients.</p>

        <h2>Key rotation</h2>
        <ol>
          <li>Create a new key with the same scopes.</li>
          <li>Deploy the new secret to your servers.</li>
          <li>Verify with <code>GET /me</code>.</li>
          <li>Revoke the old key from the partner panel.</li>
        </ol>
        <Callout variant="warning" title="No in-place secret update">
          Secrets cannot be rotated in place. Always create + revoke to maintain audit trail.
        </Callout>

        <h2>If a key leaks</h2>
        <ol>
          <li>Revoke the key immediately in <Link to="/api-keys">API Keys</Link> settings.</li>
          <li>Create a replacement key.</li>
          <li>Review <code>lastUsedAt</code> and IP logs with Madadgaar support if suspicious activity occurred.</li>
        </ol>

        <h2>Email security</h2>
        <p>
          Creation emails contain the full API key for your records. Protect your inbox and use
          partner email addresses with strong passwords and 2FA where possible.
        </p>
      </div>
    </>
  );
}
