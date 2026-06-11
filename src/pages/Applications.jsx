import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Callout from '../components/Callout';
import EndpointCard from '../components/EndpointCard';
import { PARTNER_V1 } from '../constants/api';

export default function Applications() {
  return (
    <>
      <SEO
        title="Applications API"
        description="Madadgaar Partner API for customer installment applications: list incoming requests, view details, and update approval status from your CRM."
        canonicalPath="/applications"
      />
      <PageHero
        badge="Roadmap"
        title="Applications"
        subtitle="Manage customer installment requests (leads) assigned to your partner account. These endpoints map to the partner panel Requests page."
      />

      <div className="doc-prose">
        <Callout variant="warning" title="Rollout status">
          Application endpoints are defined in the Partner API specification and map to existing backend
          controllers. Confirm with your Madadgaar account manager that <code>/api/v1/partner/applications</code>
          is enabled on your production environment before building against them.
        </Callout>

        <h2>How applications link to partners</h2>
        <p>
          When a customer applies for an installment on Madadgaar, the application record stores{' '}
          <code>createdBy</code> as the partner <code>userId</code> who receives the lead. The selected
          payment plan&apos;s <code>partnerId</code> determines routing. Your integration should only
          see applications where you are the assigned partner — ownership checks prevent cross-partner access.
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
        description="Full application detail including customer info, selected plan, and status history. Requires ownership."
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
        description="Delete/cancel an application when supported by business rules."
      />
    </>
  );
}
