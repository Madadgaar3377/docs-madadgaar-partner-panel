import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Callout from '../components/Callout';
import EndpointCard from '../components/EndpointCard';
import { PARTNER_V1 } from '../constants/api';

export default function Applications() {
  return (
    <>
      <SEO
        title="Installment Applications API"
        description="Madadgaar Partner API for customer installment applications: list incoming requests, view details, and update approval status from your CRM."
        canonicalPath="/applications"
      />
      <PageHero
        badge="Installments"
        title="Installment applications"
        subtitle="List, view, approve, reject, and delete customer installment requests via API key — same leads as the partner panel Requests page. For loans, see Loan applications."
      />

      <div className="doc-prose">
        <Callout variant="info" title="Loan applications are separate">
          This page covers <strong>installment</strong> applications at <code>/applications</code>.
          For loan leads on your loan plans, use <Link to="/loan-applications">Loan applications API</Link> at{' '}
          <code>/loan-applications</code> with <code>loan-applications:read</code> / <code>loan-applications:write</code> scopes.
        </Callout>

        <Callout variant="success" title="Live on production">
          Endpoints are mounted at <code>/api/v1/partner/applications</code>. Requires{' '}
          <code>applications:read</code> / <code>applications:write</code> scopes on your API key.
          OpenAPI: <a href={`${PARTNER_V1}/openapi.json`} target="_blank" rel="noreferrer">openapi.json</a>.
        </Callout>

        <h2>How applications link to partners</h2>
        <p>
          When a customer applies for an installment on Madadgaar, the application record stores{' '}
          <code>createdBy</code> as the partner <code>userId</code> who receives the lead. The selected
          payment plan&apos;s <code>partnerId</code> determines routing. Your integration should only
          see applications where you are the assigned partner  ownership checks prevent cross-partner access.
        </p>

        <h2>Typical CRM workflow</h2>
        <ol>
          <li>Poll <code>GET /applications?status=pending</code> every few minutes.</li>
          <li>Push new leads into your CRM with application ID and customer contact.</li>
          <li>When sales approves, call <code>PATCH /applications/:id/status</code> with approved/rejected.</li>
          <li>Customer receives email notification from Madadgaar automatically.</li>
        </ol>
      </div>

      <EndpointCard
        method="GET"
        path={`${PARTNER_V1}/applications`}
        scope="applications:read"
        description="List incoming installment applications for your partner. Filter by status: pending, approved, rejected, etc."
        curl={`curl -s "${PARTNER_V1}/applications?status=pending" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
        test={{ method: 'GET', url: `${PARTNER_V1}/applications?status=pending` }}
      />

      <EndpointCard
        method="GET"
        path={`${PARTNER_V1}/applications/:applicationId`}
        scope="applications:read"
        description="Full application detail including customer info, selected plan, and agent details. Only applications where createdBy matches your partnerId."
        curl={`curl -s "${PARTNER_V1}/applications/APP123" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
        test={{ method: 'GET', url: `${PARTNER_V1}/applications/APP123` }}
      />

      <EndpointCard
        method="PATCH"
        path={`${PARTNER_V1}/applications/:applicationId/status`}
        scope="applications:write"
        description="Approve, reject, or update application status. Triggers customer and internal notifications."
        curl={`curl -s -X PATCH "${PARTNER_V1}/applications/APP123/status" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"status":"approved","note":"Customer verified"}'`}
        test={{
          method: 'PATCH',
          url: `${PARTNER_V1}/applications/APP123/status`,
          body: { status: 'approved', note: 'Customer verified' },
        }}
      />

      <EndpointCard
        method="DELETE"
        path={`${PARTNER_V1}/applications/:applicationId`}
        scope="applications:write"
        description="Delete pending, rejected, or cancelled applications assigned to your partner."
        curl={`curl -s -X DELETE "${PARTNER_V1}/applications/APP123" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
        test={{ method: 'DELETE', url: `${PARTNER_V1}/applications/APP123` }}
      />
    </>
  );
}
