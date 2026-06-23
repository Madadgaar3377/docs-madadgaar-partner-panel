import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Callout from '../components/Callout';
import CodeBlock from '../components/CodeBlock';
import StepGuide from '../components/StepGuide';
import { PARTNER_V1, PARTNER_PANEL, KEYS_BASE } from '../constants/api';

export default function GettingStarted() {
  return (
    <>
      <SEO
        title="Getting Started"
        description="Complete beginner-friendly guide: verify your partner account, generate an API key, test the connection, and list your first installment products."
        canonicalPath="/getting-started"
      />
      <PageHero
        badge="Beginner friendly"
        title="Getting Started"
        subtitle="Follow these steps in order. Each step explains what you are doing and why  not just commands to copy. Most partners complete setup in under 30 minutes."
      />

      <div className="doc-prose">
        <Callout variant="info" title="Before you begin  checklist">
          Make sure all items below are true. If any is missing, the API will return errors and this guide cannot fix it until your account is ready.
          <ul className="mt-2 mb-0">
            <li>You have a <strong>partner account</strong> on Madadgaar (not a regular customer account)</li>
            <li>Your <strong>email is verified</strong> (OTP completed at signup)</li>
            <li>Your <strong>company profile is complete</strong> (SECP, NTN, company name submitted)</li>
            <li><strong>Admin has approved</strong> your partner account (you can access the full partner panel)</li>
          </ul>
        </Callout>
      </div>

      <StepGuide
        steps={[
          {
            title: 'Log into the partner panel',
            description: 'Open the partner portal in your browser and sign in with your partner email and password. This creates a temporary JWT token in your browser  think of it as your "logged in" session.',
            detail: 'Your integration server will NOT use this JWT long-term. You only need it now to generate an API key, or you can generate the key directly in Settings → API Keys without reading any code.',
            children: (
              <a href={PARTNER_PANEL} target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm font-semibold text-madad-600 hover:text-madad-700">
                Open partner.madadgaar.com.pk →
              </a>
            ),
          },
          {
            title: 'Generate your API key',
            description: 'Go to Settings → API Keys → click "Generate Key". Give it a clear name like "Production Website" or "ERP Sync". Select scopes: installments, loans, and/or applications as needed.',
            detail: 'When you click Generate, the full secret appears once on screen AND is sent to your registered email. Save both copies. The email is your long-term backup if you lose the key from the screen.',
          },
          {
            title: 'Save the key on your server',
            description: 'Copy the key that starts with mg_live_ and store it in an environment variable on a server you control  not on your laptop\'s desktop, not in WhatsApp, not in GitHub.',
            children: (
              <CodeBlock title=".env file on your server">{`MADADGAAR_API_KEY=mg_live_paste_your_key_here
MADADGAAR_API_BASE=${PARTNER_V1}`}</CodeBlock>
            ),
          },
          {
            title: 'Test that the key works',
            description: 'Run this curl command from a terminal on a machine with internet access. Replace the key with yours. A successful response means Madadgaar recognized your key and your partner account is active.',
            children: (
              <CodeBlock
                title="Test command"
                test={{ method: 'GET', url: `${PARTNER_V1}/me` }}
              >{`curl -s "${PARTNER_V1}/me" \\
  -H "Authorization: Bearer YOUR_MG_LIVE_KEY_HERE"`}</CodeBlock>
            ),
          },
          {
            title: 'List your installment products',
            description: 'If the test passed, try listing installment products. This returns the same data you see under Installments → View All Plans in the partner panel.',
            children: (
              <CodeBlock
                title="List installments"
                test={{ method: 'GET', url: `${PARTNER_V1}/installments?page=1&limit=10` }}
              >{`curl -s "${PARTNER_V1}/installments?page=1&limit=10" \\
  -H "X-API-Key: YOUR_MG_LIVE_KEY_HERE"`}</CodeBlock>
            ),
          },
          {
            title: 'Optional: list your loan plans',
            description: 'If you sell loans, enable loans:read on your key and list plans from the partner panel Loans section.',
            children: (
              <CodeBlock
                title="List loans"
                test={{ method: 'GET', url: `${PARTNER_V1}/loans?page=1&limit=10` }}
              >{`curl -s "${PARTNER_V1}/loans?page=1&limit=10" \\
  -H "Authorization: Bearer YOUR_MG_LIVE_KEY_HERE"`}</CodeBlock>
            ),
          },
        ]}
      />

      <div className="doc-prose">
        <h2>Understanding the response</h2>
        <p>
          Every Madadgaar API response is JSON with a <code>success</code> field. When <code>success: true</code>,
          read the <code>data</code> field for results. When <code>success: false</code>, read <code>message</code> 
          it tells you exactly what went wrong (wrong key, missing scope, unverified account, etc.).
        </p>

        <h2>Common first-time mistakes</h2>
        <ul>
          <li><strong>Using API key on /keys endpoints</strong>  key management needs JWT from login, not API key.</li>
          <li><strong>Putting key in frontend JavaScript</strong>  anyone can steal it from browser dev tools.</li>
          <li><strong>Partner not admin-verified</strong>  complete profile and wait for Madadgaar approval first.</li>
          <li><strong>Missing write scope</strong>  create/update needs <code>installments:write</code> or <code>loans:write</code> on the key.</li>
        </ul>

        <Callout variant="success" title="You are ready!">
          Next, read <Link to="/authentication">Authentication</Link> to understand JWT vs API key deeply,
          <Link to="/installments"> Installments</Link> or <Link to="/loans">Loans</Link> to create products via API,
          and <Link to="/loan-applications">Loan applications</Link> to manage loan leads.
        </Callout>

        <h2>Optional: create key via HTTP (advanced)</h2>
        <p>Developers can also create keys programmatically if they have a partner JWT from login:</p>
        <CodeBlock
          title="http"
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
        >{`POST ${KEYS_BASE}
Authorization: Bearer <partner_jwt_from_login>
Content-Type: application/json

{
  "name": "Production ERP",
  "scopes": ["installments:read", "installments:write", "loans:read", "loans:write", "loan-applications:read", "loan-applications:write", "profile:read"],
  "expiresAt": null
}`}</CodeBlock>
      </div>
    </>
  );
}
