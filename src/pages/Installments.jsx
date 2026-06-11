import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import Callout from '../components/Callout';
import EndpointCard from '../components/EndpointCard';
import CategoryFilter from '../components/CategoryFilter';
import FieldTable from '../components/FieldTable';
import CodeBlock from '../components/CodeBlock';
import { PARTNER_V1 } from '../constants/api';
import {
  COMPLETE_CREATE_INSTALLMENT,
  INSTALLMENT_FIELD_REFERENCE,
  PAYMENT_PLAN_FIELDS,
} from '../constants/apiExamples';

const INSTALLMENT_SECTIONS = [
  { id: 'all', label: 'All' },
  { id: 'endpoints', label: 'Endpoints' },
  { id: 'create', label: 'How to create' },
  { id: 'fields', label: 'Field reference' },
];

const CREATE_BODY = JSON.stringify(COMPLETE_CREATE_INSTALLMENT, null, 2);

export default function Installments() {
  const [section, setSection] = useState('all');
  const show = (id) => section === 'all' || section === id;

  return (
    <>
      <SEO
        title="Installments API"
        description="Complete Madadgaar Partner API reference for installment products: variants, finance, payment plans, field reference, and Test now examples."
        canonicalPath="/installments"
        keywords="Madadgaar installment API, create product API, variants finance payment plans"
      />
      <PageHero
        badge="API key required"
        title="Installments"
        subtitle="Manage installment products programmatically — including variants, finance key-value pairs, and product specifications. Every curl example has a Test now button."
      />

      <CategoryFilter categories={INSTALLMENT_SECTIONS} active={section} onChange={setSection} />

      {(show('endpoints') || show('create')) && (
        <div className="doc-prose">
          <h2>How partner access works</h2>
          <p>
            Madadgaar supports <strong>multi-vendor products</strong>: one product listing (e.g. iPhone 15) can
            have payment plans from multiple partners. Your API responses only include <em>your</em> plans.
          </p>
          <ul>
            <li><strong>Product owner</strong> — you created the listing. You can edit product fields and delete the entire product.</li>
            <li><strong>Contributor</strong> — you added your own payment plans to someone else&apos;s product. You can only edit/remove your plans, not the core product.</li>
          </ul>

          <Callout variant="tip" title="partnerId auto-filled">
            Never send another partner&apos;s <code>userId</code>. The API overwrites <code>partnerId</code> on
            payment plans from your API key identity.
          </Callout>
        </div>
      )}

      {show('create') && (
        <div className="doc-prose">
          <h2>How to create an installment product (complete guide)</h2>
          <ol>
            <li>Ensure your API key has <code>installments:write</code> scope.</li>
            <li>Prepare product images — upload via partner panel first, then use HTTPS URLs in <code>productImages</code>.</li>
            <li>Set required fields: <code>productName</code>, <code>category</code>, <code>city</code>, <code>price</code>.</li>
            <li>Add at least one <code>paymentPlans[]</code> entry with <code>planName</code> and <code>installmentPrice &gt; 0</code>.</li>
            <li>Optional: add <code>variants[]</code> for RAM/storage/color — each variant can have its own <code>paymentPlans</code>.</li>
            <li>Optional: set <code>finance</code> at product level — <code>{'{ bankName, financeInfo }'}</code> for bank partnership details.</li>
            <li>Optional: add <code>productSpecifications</code> with dynamic <code>field</code> / <code>value</code> pairs.</li>
            <li>POST to <code>/installments</code> — response includes <code>installmentPlanId</code> for future updates.</li>
          </ol>

          <Callout variant="info" title="finance object — key-value structure">
            <code>finance</code> is an object with two string keys:
            <ul className="mt-2 mb-0">
              <li><code>bankName</code> — e.g. &quot;Partner Islamic Finance&quot;</li>
              <li><code>financeInfo</code> — free text shown to customers, e.g. &quot;0% markup for 3 months&quot;</li>
            </ul>
            You can also set <code>finance</code> inside individual <code>paymentPlans[]</code> for plan-specific bank details.
          </Callout>

          <h3>Complete request body</h3>
          <p>Samsung Galaxy A55 example with variants, two payment plans, specifications, and finance:</p>
          <CodeBlock
            title="POST /installments — full JSON body"
            language="json"
            test={{ method: 'POST', url: `${PARTNER_V1}/installments`, body: COMPLETE_CREATE_INSTALLMENT }}
          >
            {CREATE_BODY}
          </CodeBlock>
        </div>
      )}

      {show('fields') && (
        <div className="doc-prose">
          <h2>Product field reference</h2>
          <FieldTable rows={INSTALLMENT_FIELD_REFERENCE} />
          <h3>paymentPlans[] fields</h3>
          <FieldTable rows={PAYMENT_PLAN_FIELDS} title="Each item in paymentPlans or variants[].paymentPlans" />
          <h3>variants[] fields</h3>
          <FieldTable
            rows={[
              { field: 'variantName', type: 'string', required: true, description: 'Label e.g. "8GB-256GB Black".' },
              { field: 'price', type: 'number', required: true, description: 'Cash price for this variant.' },
              { field: 'discountPercent', type: 'number', required: false, description: 'Percentage discount off cash price.' },
              { field: 'status', type: 'string', required: false, description: 'active or inactive — defaults to active.' },
              { field: 'paymentPlans', type: 'array', required: false, description: 'Variant-specific plans — same structure as product-level paymentPlans.' },
            ]}
          />
          <h3>finance object</h3>
          <FieldTable
            rows={[
              { field: 'bankName', type: 'string', required: false, description: 'Partner bank or finance company name.' },
              { field: 'financeInfo', type: 'string', required: false, description: 'Additional finance notes, terms, or Shariah compliance info.' },
            ]}
            title="Product-level or plan-level finance { }"
          />
        </div>
      )}

      {show('endpoints') && (
        <>
          <EndpointCard
            method="GET"
            path={`${PARTNER_V1}/installments`}
            scope="installments:read"
            description="List all installment products where you are owner or contributor. Paginated with page and limit query params."
            curl={`curl -s "${PARTNER_V1}/installments?page=1&limit=20" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
            test={{ method: 'GET', url: `${PARTNER_V1}/installments?page=1&limit=20` }}
          />

          <EndpointCard
            method="POST"
            path={`${PARTNER_V1}/installments`}
            scope="installments:write"
            description="Create a new installment product with variants, finance, specifications, and payment plans. See complete body above."
            curl={`curl -s -X POST "${PARTNER_V1}/installments" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d @create-installment.json`}
            body={CREATE_BODY}
            test={{ method: 'POST', url: `${PARTNER_V1}/installments`, body: COMPLETE_CREATE_INSTALLMENT }}
          />

          <EndpointCard
            method="GET"
            path={`${PARTNER_V1}/installments/:id`}
            scope="installments:read"
            description="Get one product by installmentPlanId or MongoDB _id."
            curl={`curl -s "${PARTNER_V1}/installments/PLAN_ID_HERE" \\
  -H "X-API-Key: $MADADGAAR_API_KEY"`}
            test={{ method: 'GET', url: `${PARTNER_V1}/installments/PLAN_ID_HERE` }}
          />

          <EndpointCard
            method="PUT"
            path={`${PARTNER_V1}/installments/:id`}
            scope="installments:write"
            description="Update product fields and/or payment plans."
            curl={`curl -s -X PUT "${PARTNER_V1}/installments/PLAN_ID" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"productName":"Updated Name","price":82000}'`}
            test={{
              method: 'PUT',
              url: `${PARTNER_V1}/installments/PLAN_ID`,
              body: { productName: 'Updated Name', price: 82000 },
            }}
          />

          <EndpointCard
            method="DELETE"
            path={`${PARTNER_V1}/installments/:id`}
            scope="installments:write"
            description="Product owner: permanently deletes the listing. Contributors remove plans via DELETE .../plans/:planId."
            curl={`curl -s -X DELETE "${PARTNER_V1}/installments/PLAN_ID" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
            test={{ method: 'DELETE', url: `${PARTNER_V1}/installments/PLAN_ID` }}
          />

          <EndpointCard
            method="POST"
            path={`${PARTNER_V1}/installments/:id/plans`}
            scope="installments:write"
            description="Add a payment plan to an existing shared product (multi-vendor)."
            curl={`curl -s -X POST "${PARTNER_V1}/installments/PLAN_ID/plans" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"planName":"6 Month Easy Plan","installmentPrice":85000,"downPayment":15000,"monthlyInstallment":12000,"tenureMonths":6}'`}
            body={`{
  "planName": "6 Month Easy Plan",
  "installmentPrice": 85000,
  "downPayment": 15000,
  "monthlyInstallment": 12000,
  "tenureMonths": 6,
  "variantIndex": null
}`}
            test={{
              method: 'POST',
              url: `${PARTNER_V1}/installments/PLAN_ID/plans`,
              body: {
                planName: '6 Month Easy Plan',
                installmentPrice: 85000,
                downPayment: 15000,
                monthlyInstallment: 12000,
                tenureMonths: 6,
                variantIndex: null,
              },
            }}
          />

          <EndpointCard
            method="DELETE"
            path={`${PARTNER_V1}/installments/:id/plans/:planId`}
            scope="installments:write"
            description="Remove one payment plan you own."
            curl={`curl -s -X DELETE "${PARTNER_V1}/installments/PLAN_ID/plans/PLAN_UUID" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`}
            test={{ method: 'DELETE', url: `${PARTNER_V1}/installments/PLAN_ID/plans/PLAN_UUID` }}
          />
        </>
      )}

      {show('endpoints') && (
        <div className="doc-prose">
          <h2>Public catalog (no API key)</h2>
          <p>
            Customer-facing sites use <code>GET /api/getInstallment/:id</code> and{' '}
            <code>GET /api/getAllInstallments</code>. Use the Partner API for back-office sync.
          </p>
          <p>
            More examples with <strong>Test now</strong> buttons: <Link to="/examples">Code Examples</Link>.
          </p>
        </div>
      )}
    </>
  );
}
