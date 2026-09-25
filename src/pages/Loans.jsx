import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Callout from '../components/Callout';
import EndpointCard from '../components/EndpointCard';
import CategoryFilter from '../components/CategoryFilter';
import FieldTable from '../components/FieldTable';
import CodeBlock from '../components/CodeBlock';
import { PARTNER_V1, API_BASE } from '../constants/api';
import {
  COMPLETE_CREATE_LOAN,
  LOAN_FIELD_REFERENCE,
  LOAN_MAJOR_CATEGORIES,
  CUSTOMER_APPLY_LOAN_BODY,
} from '../constants/apiExamples';

const LOAN_SECTIONS = [
  { id: 'all', label: 'All' },
  { id: 'endpoints', label: 'Endpoints' },
  { id: 'create', label: 'How to create' },
  { id: 'apply', label: 'Customer apply' },
  { id: 'fields', label: 'Field reference' },
];

const CREATE_BODY = JSON.stringify(COMPLETE_CREATE_LOAN, null, 2);

export default function Loans() {
  const [section, setSection] = useState('all');
  const show = (id) => section === 'all' || section === id;

  return (
    <>
      <SEO
        title="Loans API"
        description="Complete Madadgaar Partner API reference for loan plans: create, list, update, delete, field reference, customer apply flow, and Test now examples."
        canonicalPath="/loans"
        keywords="Madadgaar loan API, create loan plan API, partner loan integration Pakistan"
      />
      <PageHero
        badge="API key required"
        title="Loans"
        subtitle="Manage loan plans programmatically  same data as the partner panel Loans page. Customers apply with their Madadgaar account; you manage leads via Loan applications API."
      />

      <CategoryFilter categories={LOAN_SECTIONS} active={section} onChange={setSection} />

      {(show('endpoints') || show('create')) && (
        <div className="doc-prose">
          <Callout variant="success" title="Live on production">
            Endpoints at <code>/api/v1/partner/loans</code>. Requires{' '}
            <code>loans:read</code> / <code>loans:write</code>. OpenAPI:{' '}
            <a href={`${PARTNER_V1}/openapi.json`} target="_blank" rel="noreferrer">openapi.json</a>.
          </Callout>

          <h2>How partner access works</h2>
          <p>
            Unlike installments (multi-vendor shared products), each <strong>loan plan is owned by one partner</strong>.
            The plan stores <code>createdBy</code> as your <code>partnerId</code>. List, get, update, and delete only
            touch plans you created. On create, <code>createdBy</code> is overwritten from your API key  never send
            another partner&apos;s ID.
          </p>
          <p>
            The server assigns a unique <code>planId</code> (6-digit string) on create. Save this ID  customers need it
            when applying via <code>POST /api/applyLoan</code>, and you use it to filter applications.
          </p>

          <Callout variant="tip" title="createdBy auto-filled">
            Same rule as installments: the API sets ownership from your key identity. Tampering with{' '}
            <code>userId</code> or <code>createdBy</code> in the JSON body is ignored.
          </Callout>
        </div>
      )}

      {show('create') && (
        <div className="doc-prose">
          <h2>How to create a loan plan (step by step)</h2>
          <ol>
            <li>Ensure your API key has <code>loans:write</code> scope.</li>
            <li>Upload <code>planImage</code> and <code>planDocument</code> via partner panel upload, then use HTTPS URLs.</li>
            <li>Set required fields: <code>productName</code>, <code>bankName</code>, <code>majorCategory</code>.</li>
            <li>Set financing range: <code>minFinancingAmount</code>, <code>maxFinancingAmount</code>, tenure fields.</li>
            <li>Optional: <code>eligibility</code> (age, income, employment type, documents), <code>targetAudience</code>, <code>description</code>.</li>
            <li>POST to <code>/loans</code>  response <code>data.planId</code> is the customer-facing plan ID.</li>
            <li>Plan appears on Madadgaar after admin approval (same as partner panel).</li>
          </ol>

          <h3>Major categories</h3>
          <ul>
            {LOAN_MAJOR_CATEGORIES.map((cat) => (
              <li key={cat}><code>{cat}</code></li>
            ))}
          </ul>

          <h3>Complete request body</h3>
          <p>Personal loan example with eligibility, target audience, and document URLs:</p>
          <CodeBlock
            title="POST /loans  full JSON body"
            language="json"
            test={{ method: 'POST', url: `${PARTNER_V1}/loans`, body: COMPLETE_CREATE_LOAN }}
          >
            {CREATE_BODY}
          </CodeBlock>

          <h3>Create response</h3>
          <CodeBlock title="201 Created" language="json" showTest={false}>{`{
  "success": true,
  "message": "Loan plan created successfully",
  "data": {
    "planId": "482910",
    "productName": "Personal Loan - Salaried",
    "bankName": "Partner Bank Ltd",
    "majorCategory": "Personal Financing",
    "createdBy": "your_partner_user_id",
    "createdAt": "2026-06-17T10:00:00.000Z"
  }
}`}</CodeBlock>
        </div>
      )}

      {show('apply') && (
        <div className="doc-prose">
          <h2>How customers apply (public API)</h2>
          <p>
            Partners <strong>do not</strong> submit loan applications through the Partner API. End customers apply on
            Madadgaar (website or mobile app) using their own account JWT. The application is auto-filled from your
            loan plan and routed to your partner account via <code>planId</code>.
          </p>

          <Callout variant="warning" title="Two different auth types">
            <ul className="mb-0 mt-2">
              <li><strong>Partner API key</strong> → manage plans + applications at <code>{PARTNER_V1}</code></li>
              <li><strong>Customer JWT</strong> → apply at <code>{API_BASE}/applyLoan</code></li>
            </ul>
          </Callout>

          <h3>Customer apply endpoint</h3>
          <CodeBlock
            title="POST /api/applyLoan"
            language="json"
            showTest={false}
          >{`POST ${API_BASE}/applyLoan
Authorization: Bearer <customer_jwt>
Content-Type: application/json

${JSON.stringify(CUSTOMER_APPLY_LOAN_BODY, null, 2)}`}</CodeBlock>

          <p>
            Required: <code>planId</code> (your 6-digit plan ID). Product fields (bank, rates, tenure) are copied from
            the loan plan automatically. You manage the resulting lead via{' '}
            <Link to="/loan-applications">Loan applications API</Link>.
          </p>

          <h3>End-to-end partner workflow</h3>
          <ol>
            <li>Create loan plan via <code>POST /loans</code> → save <code>planId</code>.</li>
            <li>Plan goes live on Madadgaar after admin approval.</li>
            <li>Customer browses loans and applies with Madadgaar login.</li>
            <li>Poll <code>GET /loan-applications?status=pending</code> from your CRM.</li>
            <li>Approve/reject with <code>PATCH /loan-applications/:id/status</code>.</li>
          </ol>
        </div>
      )}

      {show('fields') && (
        <div className="doc-prose">
          <h2>Loan plan field reference</h2>
          <FieldTable rows={LOAN_FIELD_REFERENCE} />
          <h3>eligibility object</h3>
          <FieldTable
            rows={[
              { field: 'minAge', type: 'number', required: false, description: 'Minimum applicant age.' },
              { field: 'maxAge', type: 'number', required: false, description: 'Maximum applicant age.' },
              { field: 'minIncome', type: 'number', required: false, description: 'Minimum monthly income in PKR.' },
              { field: 'employmentType', type: 'string[]', required: false, description: 'Salaried | Business | Self-Employed.' },
              { field: 'requiredDocuments', type: 'string[]', required: false, description: 'e.g. CNIC, Salary Slip, Bank Statement.' },
            ]}
            title="eligibility { }"
          />
        </div>
      )}

      {show('endpoints') && (
        <>
          <EndpointCard
            method="GET"
            path={`${PARTNER_V1}/loans`}
            scope="loans:read"
            description="List all loan plans you created. Paginated with page and limit query params."
            curl={`curl -s "${PARTNER_V1}/loans?page=1&limit=20" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
            test={{ method: 'GET', url: `${PARTNER_V1}/loans?page=1&limit=20` }}
          />

          <EndpointCard
            method="POST"
            path={`${PARTNER_V1}/loans`}
            scope="loans:write"
            description="Create a new loan plan. Same payload as partner panel create form. See complete body above."
            curl={`curl -s -X POST "${PARTNER_V1}/loans" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d @create-loan.json`}
            body={CREATE_BODY}
            test={{ method: 'POST', url: `${PARTNER_V1}/loans`, body: COMPLETE_CREATE_LOAN }}
          />

          <EndpointCard
            method="GET"
            path={`${PARTNER_V1}/loans/:id`}
            scope="loans:read"
            description="Get one loan plan by 6-digit planId or MongoDB _id."
            curl={`curl -s "${PARTNER_V1}/loans/482910" \\
  -H "X-API-Key: $MADADGAAR_API_KEY"`}
            test={{ method: 'GET', url: `${PARTNER_V1}/loans/482910` }}
          />

          <EndpointCard
            method="PUT"
            path={`${PARTNER_V1}/loans/:id`}
            scope="loans:write"
            description="Update loan plan fields. Blocked: planId, createdBy, userId, _id."
            curl={`curl -s -X PUT "${PARTNER_V1}/loans/482910" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"description":"Updated terms","indicativeRate":"10% - 15%"}'`}
            test={{
              method: 'PUT',
              url: `${PARTNER_V1}/loans/482910`,
              body: { description: 'Updated terms', indicativeRate: '10% - 15%' },
            }}
          />

          <EndpointCard
            method="DELETE"
            path={`${PARTNER_V1}/loans/:id`}
            scope="loans:write"
            description="Permanently delete a loan plan you own (including plan image/document on R2)."
            curl={`curl -s -X DELETE "${PARTNER_V1}/loans/482910" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
            test={{ method: 'DELETE', url: `${PARTNER_V1}/loans/482910` }}
          />
        </>
      )}

      {show('endpoints') && (
        <div className="doc-prose">
          <h2>Public catalog (no API key)</h2>
          <p>
            Customer-facing sites list loans via public endpoints such as{' '}
            <code>GET /api/getAllLoans</code>. Use the Partner API for back-office sync and CRM integration.
          </p>
          <p>
            More examples with <strong>Test now</strong> buttons: <Link to="/examples">Code Examples</Link>.
            Manage applications: <Link to="/loan-applications">Loan applications</Link>.
          </p>
        </div>
      )}
    </>
  );
}
