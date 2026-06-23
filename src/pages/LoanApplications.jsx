import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Callout from '../components/Callout';
import EndpointCard from '../components/EndpointCard';
import FieldTable from '../components/FieldTable';
import CodeBlock from '../components/CodeBlock';
import { PARTNER_V1, API_BASE } from '../constants/api';
import { LOAN_APPLICATION_STATUS, CUSTOMER_APPLY_LOAN_BODY } from '../constants/apiExamples';
import { Link } from 'react-router-dom';

export default function LoanApplications() {
  return (
    <>
      <SEO
        title="Loan Applications API"
        description="Madadgaar Partner API for customer loan applications: list, view, approve, reject, delete, status values, and customer apply flow."
        canonicalPath="/loan-applications"
      />
      <PageHero
        badge="Live"
        title="Loan applications"
        subtitle="List, view, approve, reject, and delete customer loan requests on your plans — same leads as the partner panel loan requests."
      />

      <div className="doc-prose">
        <Callout variant="success" title="Live on production">
          Endpoints at <code>/api/v1/partner/loan-applications</code>. Requires{' '}
          <code>loan-applications:read</code> / <code>loan-applications:write</code>. OpenAPI:{' '}
          <a href={`${PARTNER_V1}/openapi.json`} target="_blank" rel="noreferrer">openapi.json</a>.
        </Callout>

        <Callout variant="info" title="Not the same as /applications">
          <code>/applications</code> is for <strong>installment</strong> customer requests (filtered by{' '}
          <code>createdBy</code>). <code>/loan-applications</code> is for <strong>loan</strong> requests (filtered by{' '}
          <code>planId</code> on plans you own). Use separate scopes on your API key.
        </Callout>

        <h2>How applications link to partners</h2>
        <p>
          When a customer applies via <code>POST {API_BASE}/applyLoan</code>, Madadgaar:
        </p>
        <ol>
          <li>Loads your loan plan by <code>planId</code> from the request body.</li>
          <li>Auto-fills product details (bank, rates, tenure) from the plan.</li>
          <li>Assigns an agent based on commission rules and city.</li>
          <li>Creates a <code>LoanApplication</code> record with status <code>pending</code>.</li>
        </ol>
        <p>
          The Partner API returns only applications whose <code>planId</code> belongs to a loan plan where{' '}
          <code>createdBy === your partnerId</code>. Cross-partner access returns 403.
        </p>

        <h2>Typical CRM workflow</h2>
        <ol>
          <li>Create loan plans via <Link to="/loans">Loans API</Link> and note each <code>planId</code>.</li>
          <li>Poll <code>GET /loan-applications?status=pending</code> every few minutes (or use webhooks when available).</li>
          <li>Optionally filter one product: <code>?planId=482910&amp;status=pending</code>.</li>
          <li>Push new leads into your CRM with <code>applicationId</code>, applicant contact, and loan amount.</li>
          <li>When sales decides, call <code>PATCH /loan-applications/:id/status</code> with approved/rejected/in_progress.</li>
          <li>Customer receives email and push notification from Madadgaar automatically.</li>
        </ol>

        <h2>Status values</h2>
        <FieldTable rows={LOAN_APPLICATION_STATUS} title="Valid status for PATCH .../status" />

        <h2>Query parameters (list)</h2>
        <FieldTable
          rows={[
            { field: 'page', type: 'integer', required: false, description: 'Page number — default 1.' },
            { field: 'limit', type: 'integer', required: false, description: 'Items per page — default 20, max 100.' },
            { field: 'status', type: 'string', required: false, description: 'Filter: pending, in_progress, approved, rejected, cancelled.' },
            { field: 'planId', type: 'string', required: false, description: 'Filter to one of your loan plan IDs (6-digit).' },
          ]}
        />

        <h2>Customer apply (reference)</h2>
        <p>Partners do not call this — document for your integration team and support staff:</p>
        <CodeBlock title="POST /api/applyLoan" language="json" showTest={false}>
          {`POST ${API_BASE}/applyLoan
Authorization: Bearer <customer_jwt>

${JSON.stringify(CUSTOMER_APPLY_LOAN_BODY, null, 2)}`}
        </CodeBlock>
      </div>

      <EndpointCard
        method="GET"
        path={`${PARTNER_V1}/loan-applications`}
        scope="loan-applications:read"
        description="List loan applications on your plans. Filter by status and optional planId."
        curl={`curl -s "${PARTNER_V1}/loan-applications?status=pending&page=1&limit=20" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
        test={{ method: 'GET', url: `${PARTNER_V1}/loan-applications?status=pending` }}
        response={`{
  "success": true,
  "data": [
    {
      "applicationId": "482910",
      "planId": "123456",
      "productName": "Personal Loan - Salaried",
      "status": "pending",
      "applicantInfo": { "fullName": "Ali Ahmed" },
      "loanRequirement": { "loanAmount": 500000 }
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 1, "pages": 1 }
}`}
      />

      <EndpointCard
        method="GET"
        path={`${PARTNER_V1}/loan-applications/:applicationId`}
        scope="loan-applications:read"
        description="Full detail: applicantInfo, contactInfo, incomeDetails, loanRequirement, documents, assigned agent. ID = 6-digit applicationId or MongoDB _id."
        curl={`curl -s "${PARTNER_V1}/loan-applications/482910" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
        test={{ method: 'GET', url: `${PARTNER_V1}/loan-applications/482910` }}
      />

      <EndpointCard
        method="PATCH"
        path={`${PARTNER_V1}/loan-applications/:applicationId/status`}
        scope="loan-applications:write"
        description="Approve, reject, or update status. Body: { status, note? }. Triggers customer email and in-app notification."
        curl={`curl -s -X PATCH "${PARTNER_V1}/loan-applications/482910/status" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"status":"approved","note":"Customer verified"}'`}
        test={{
          method: 'PATCH',
          url: `${PARTNER_V1}/loan-applications/482910/status`,
          body: { status: 'approved', note: 'Customer verified' },
        }}
        body={`{
  "status": "approved",
  "note": "Optional message shown to customer"
}`}
      />

      <EndpointCard
        method="DELETE"
        path={`${PARTNER_V1}/loan-applications/:applicationId`}
        scope="loan-applications:write"
        description="Delete application. Only pending, rejected, or cancelled. Removes uploaded documents from storage."
        curl={`curl -s -X DELETE "${PARTNER_V1}/loan-applications/482910" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
        test={{ method: 'DELETE', url: `${PARTNER_V1}/loan-applications/482910` }}
      />

      <div className="doc-prose">
        <h2>Recommended API key scopes</h2>
        <p>For a loan CRM integration:</p>
        <CodeBlock title="scopes" showTest={false}>{`[
  "loans:read",
  "loans:write",
  "loan-applications:read",
  "loan-applications:write",
  "profile:read"
]`}</CodeBlock>
        <p>
          See <Link to="/scopes">Scopes &amp; Permissions</Link> for the full matrix.
        </p>
      </div>
    </>
  );
}
