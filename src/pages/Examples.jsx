import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/PageHero';
import CodeBlock from '../components/CodeBlock';
import CategoryFilter from '../components/CategoryFilter';
import { PARTNER_V1 } from '../constants/api';
import { CODE_EXAMPLES, EXAMPLE_CATEGORIES, COMPLETE_CREATE_INSTALLMENT } from '../constants/apiExamples';

function getExampleCode(ex) {
  if (typeof ex.getCode === 'function') return ex.getCode();
  return ex.code;
}

export default function Examples() {
  const [category, setCategory] = useState('all');

  const filtered = useMemo(
    () => (category === 'all' ? CODE_EXAMPLES : CODE_EXAMPLES.filter((ex) => ex.category === category)),
    [category],
  );

  return (
    <>
      <SEO
        title="Code Examples"
        description="Copy-paste Madadgaar Partner API curl examples with Test now buttons. Filter by Installments, Applications, Dashboard, and API Keys."
        canonicalPath="/examples"
      />
      <PageHero
        badge="Cookbook"
        title="Code Examples"
        subtitle="Every example includes a Test now button that opens API Test Lab and copies the curl command. Filter by topic at the top."
      />

      <CategoryFilter categories={EXAMPLE_CATEGORIES} active={category} onChange={setCategory} />

      <div className="space-y-8">
        {filtered.map((ex) => (
          <section key={ex.id} className="glass-card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{ex.title}</h2>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-4">{ex.description}</p>
            <CodeBlock title={ex.language} language={ex.language} test={ex.test}>
              {getExampleCode(ex)}
            </CodeBlock>
          </section>
        ))}
      </div>

      <div className="doc-prose mt-12">
        <h2>Complete create installment JSON</h2>
        <p>
          Use this full payload when creating products with variants, finance, and specifications.
          See the <Link to="/installments">Installments</Link> page for field-by-field reference.
        </p>
        <CodeBlock
          title="Request body (JSON)"
          language="json"
          test={{ method: 'POST', url: `${PARTNER_V1}/installments`, body: COMPLETE_CREATE_INSTALLMENT }}
        >
          {JSON.stringify(COMPLETE_CREATE_INSTALLMENT, null, 2)}
        </CodeBlock>

        <h2>Environment setup</h2>
        <CodeBlock title=".env" showTest={false}>{`MADADGAAR_API_KEY=mg_live_your_secret
MADADGAAR_API_BASE=${PARTNER_V1}`}</CodeBlock>

        <h2>Node.js (fetch)</h2>
        <CodeBlock
          title="sync-installments.js"
          test={{ method: 'GET', url: `${PARTNER_V1}/installments?page=1&limit=50` }}
        >{`const API_KEY = process.env.MADADGAAR_API_KEY;
const BASE = process.env.MADADGAAR_API_BASE;

async function listInstallments(page = 1) {
  const res = await fetch(\`\${BASE}/installments?page=\${page}&limit=50\`, {
    headers: {
      Authorization: \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data;
}

async function main() {
  const check = await fetch(\`\${BASE}/me\`, {
    headers: { Authorization: \`Bearer \${API_KEY}\` },
  });
  console.log('Key valid:', await check.json());

  const catalog = await listInstallments(1);
  console.log('Products:', catalog.data.length);
  console.log('Pagination:', catalog.pagination);
}

main().catch(console.error);`}</CodeBlock>

        <h2>Python (requests)</h2>
        <CodeBlock
          title="madadgaar_client.py"
          test={{ method: 'GET', url: `${PARTNER_V1}/me` }}
        >{`import os
import requests

API_KEY = os.environ["MADADGAAR_API_KEY"]
BASE = os.environ["MADADGAAR_API_BASE"]
HEADERS = {"Authorization": f"Bearer {API_KEY}"}

def list_installments(page=1, limit=20):
    r = requests.get(f"{BASE}/installments", params={"page": page, "limit": limit}, headers=HEADERS, timeout=30)
    r.raise_for_status()
    return r.json()

def create_product(payload):
    r = requests.post(f"{BASE}/installments", json=payload, headers=HEADERS, timeout=60)
    r.raise_for_status()
    return r.json()

if __name__ == "__main__":
    me = requests.get(f"{BASE}/me", headers=HEADERS).json()
    print("Partner:", me.get("data", {}).get("partnerId"))
    print("Installments:", len(list_installments()["data"]))`}</CodeBlock>

        <h2>Error handling template</h2>
        <CodeBlock title="response handling" showTest={false}>{`// Always check success field
if (!response.success) {
  if (response.message?.includes('scope')) {
    // Key missing permission — update scopes or use different key
  }
  if (response.message?.includes('Invalid or expired')) {
    // Rotate key
  }
  throw new Error(response.message);
}`}</CodeBlock>
      </div>
    </>
  );
}
