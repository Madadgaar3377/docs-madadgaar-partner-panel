import { PARTNER_V1, KEYS_BASE } from './api';

export const EXAMPLE_CATEGORIES = [
  { id: 'all', label: 'All examples' },
  { id: 'general', label: 'General / Auth' },
  { id: 'installments', label: 'Installments' },
  { id: 'applications', label: 'Applications' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'api-keys', label: 'API Keys' },
];

export const COMPLETE_CREATE_INSTALLMENT = {
  productName: 'Samsung Galaxy A55',
  category: 'smartphones',
  customCategory: '',
  city: 'Karachi',
  price: 85000,
  description: 'Official Samsung warranty. Box packed with all accessories.',
  productImages: [
    'https://cdn.example.com/products/a55-front.jpg',
    'https://cdn.example.com/products/a55-back.jpg',
  ],
  videoUrl: 'https://www.youtube.com/watch?v=example',
  companyName: 'Your Registered Company Name',
  companyNameOther: '',
  postedBy: 'Partner',
  status: 'pending',
  downpayment: 10000,
  tenure: '12',
  customTenure: '',
  productSpecifications: {
    category: 'smartphones',
    subCategory: 'android',
    specifications: [
      { field: 'RAM', value: '8GB' },
      { field: 'Storage', value: '256GB' },
      { field: 'Screen', value: '6.6 inch Super AMOLED' },
      { field: 'Battery', value: '5000 mAh' },
      { field: 'Camera', value: '50MP Triple' },
    ],
  },
  paymentPlans: [
    {
      planName: '12 Month Standard Plan',
      cashPrice: 85000,
      installmentPrice: 85000,
      downPayment: 10000,
      monthlyInstallment: 7500,
      tenureMonths: 12,
      customTenureLabel: '12 months',
      interestRatePercent: 0,
      interestType: 'Flat Rate',
      markup: 5000,
      otherChargesNote: 'Processing fee included in markup',
      finance: {
        bankName: 'Partner Islamic Finance',
        financeInfo: 'Shariah-compliant plan — no hidden charges',
      },
    },
    {
      planName: '6 Month Quick Plan',
      cashPrice: 85000,
      installmentPrice: 85000,
      downPayment: 20000,
      monthlyInstallment: 11500,
      tenureMonths: 6,
      interestRatePercent: 8,
      interestType: 'Reducing Balance',
      markup: 3000,
      finance: {
        bankName: 'Partner Bank',
        financeInfo: 'Early settlement allowed',
      },
    },
  ],
  variants: [
    {
      variantName: '8GB-128GB Black',
      price: 79999,
      discountPercent: 5,
      status: 'active',
      paymentPlans: [
        {
          planName: '128GB — 6 Month',
          cashPrice: 79999,
          installmentPrice: 79999,
          downPayment: 8000,
          monthlyInstallment: 13000,
          tenureMonths: 6,
          interestRatePercent: 12,
          interestType: 'Flat Rate',
          markup: 2000,
        },
      ],
    },
    {
      variantName: '8GB-256GB Lavender',
      price: 89999,
      discountPercent: 0,
      status: 'active',
      paymentPlans: [],
    },
  ],
  finance: {
    bankName: 'Madadgaar Finance Network',
    financeInfo: 'Partner-wide finance note shown on product listing. Use bankName + financeInfo for bank partnership details.',
  },
};

export const INSTALLMENT_FIELD_REFERENCE = [
  { field: 'productName', type: 'string', required: true, description: 'Display name of the product on Madadgaar and partner sites.' },
  { field: 'category', type: 'string', required: true, description: 'Product category slug, e.g. smartphones, laptops, appliances.' },
  { field: 'customCategory', type: 'string', required: false, description: 'Use when category is "other" — your custom category label.' },
  { field: 'city', type: 'string', required: true, description: 'City where product is available (Karachi, Lahore, etc.).' },
  { field: 'price', type: 'number', required: true, description: 'Base cash price. Can be 0 if all pricing is in variants only.' },
  { field: 'description', type: 'string', required: false, description: 'Long product description — warranty, condition, box contents.' },
  { field: 'productImages', type: 'string[]', required: false, description: 'Array of HTTPS image URLs (upload images via partner panel upload API first).' },
  { field: 'videoUrl', type: 'string', required: false, description: 'Optional YouTube or product video URL.' },
  { field: 'companyName', type: 'string', required: false, description: 'Your company display name on the listing.' },
  { field: 'postedBy', type: 'string', required: false, description: 'Set to "Partner" for partner-created listings.' },
  { field: 'status', type: 'string', required: false, description: 'Defaults to pending — admin approves before public catalog shows product.' },
  { field: 'downpayment', type: 'number', required: false, description: 'Legacy global down payment field (optional if plans define downPayment).' },
  { field: 'tenure', type: 'string', required: false, description: 'Human tenure label for simple listings.' },
  { field: 'productSpecifications', type: 'object', required: false, description: 'Category specs: { category, subCategory, specifications: [{ field, value }] }.' },
  { field: 'paymentPlans', type: 'array', required: false, description: 'Payment plans on the base product (not tied to a variant). See plan fields below.' },
  { field: 'variants', type: 'array', required: false, description: 'RAM/storage/color options — each variant has price, discountPercent, and optional paymentPlans.' },
  { field: 'finance', type: 'object', required: false, description: 'Product-level finance: { bankName, financeInfo } — bank partnership info.' },
];

export const PAYMENT_PLAN_FIELDS = [
  { field: 'planName', type: 'string', required: true, description: 'Label shown to customers, e.g. "12 Month Plan".' },
  { field: 'cashPrice', type: 'number', required: false, description: 'Cash price this plan is based on.' },
  { field: 'installmentPrice', type: 'number', required: true, description: 'Total deal / installment price — must be > 0.' },
  { field: 'downPayment', type: 'number', required: false, description: 'Upfront amount customer pays.' },
  { field: 'monthlyInstallment', type: 'number', required: false, description: 'Monthly payment amount.' },
  { field: 'tenureMonths', type: 'number', required: false, description: 'Number of months (e.g. 6, 12, 24).' },
  { field: 'interestRatePercent', type: 'number', required: false, description: 'Annual or flat rate % depending on interestType.' },
  { field: 'interestType', type: 'string', required: false, description: 'Flat Rate | Reducing Balance | Compound Interest | Profit-Based (Islamic/Shariah)' },
  { field: 'markup', type: 'number', required: false, description: 'Additional markup amount on financed portion.' },
  { field: 'otherChargesNote', type: 'string', required: false, description: 'Free text for fees, insurance, etc.' },
  { field: 'finance.bankName', type: 'string', required: false, description: 'Bank name for this specific plan.' },
  { field: 'finance.financeInfo', type: 'string', required: false, description: 'Plan-specific finance notes.' },
];

export const CODE_EXAMPLES = [
  {
    id: 'test-me',
    category: 'general',
    title: 'Test API key — GET /me',
    description: 'First call after creating your key. Confirms the secret works and returns your partnerId.',
    language: 'bash',
    code: `curl -s "${PARTNER_V1}/me" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`,
    test: { method: 'GET', url: `${PARTNER_V1}/me` },
  },
  {
    id: 'list-installments',
    category: 'installments',
    title: 'List installment products',
    description: 'Paginated list — same data as partner panel "View All Plans".',
    language: 'bash',
    code: `curl -s "${PARTNER_V1}/installments?page=1&limit=20" \\
  -H "X-API-Key: $MADADGAAR_API_KEY"`,
    test: { method: 'GET', url: `${PARTNER_V1}/installments?page=1&limit=20` },
  },
  {
    id: 'create-installment-full',
    category: 'installments',
    title: 'Create installment — complete payload',
    description: 'Full example with variants, finance, productSpecifications, and multiple payment plans.',
    language: 'bash',
    getCode() {
      return `curl -s -X POST "${PARTNER_V1}/installments" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(COMPLETE_CREATE_INSTALLMENT)}'`;
    },
    test: {
      method: 'POST',
      url: `${PARTNER_V1}/installments`,
      body: COMPLETE_CREATE_INSTALLMENT,
    },
  },
  {
    id: 'get-installment',
    category: 'installments',
    title: 'Get one installment by ID',
    description: 'Use installmentPlanId from create response or list.',
    language: 'bash',
    code: `curl -s "${PARTNER_V1}/installments/YOUR_PLAN_ID" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`,
    test: { method: 'GET', url: `${PARTNER_V1}/installments/YOUR_PLAN_ID` },
  },
  {
    id: 'update-installment',
    category: 'installments',
    title: 'Update installment product',
    description: 'Owner can update product fields. Contributors can only update their own payment plans.',
    language: 'bash',
    code: `curl -s -X PUT "${PARTNER_V1}/installments/YOUR_PLAN_ID" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"productName":"Samsung Galaxy A55 (Updated)","price":82000}'`,
    test: {
      method: 'PUT',
      url: `${PARTNER_V1}/installments/YOUR_PLAN_ID`,
      body: { productName: 'Samsung Galaxy A55 (Updated)', price: 82000 },
    },
  },
  {
    id: 'add-plan',
    category: 'installments',
    title: 'Add payment plan to existing product',
    description: 'Add your plan to a shared multi-vendor product.',
    language: 'bash',
    code: `curl -s -X POST "${PARTNER_V1}/installments/YOUR_PLAN_ID/plans" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "planName": "6 Month Easy Plan",
    "installmentPrice": 85000,
    "downPayment": 15000,
    "monthlyInstallment": 12000,
    "tenureMonths": 6,
    "variantIndex": null
  }'`,
    test: {
      method: 'POST',
      url: `${PARTNER_V1}/installments/YOUR_PLAN_ID/plans`,
      body: {
        planName: '6 Month Easy Plan',
        installmentPrice: 85000,
        downPayment: 15000,
        monthlyInstallment: 12000,
        tenureMonths: 6,
        variantIndex: null,
      },
    },
  },
  {
    id: 'list-applications',
    category: 'applications',
    title: 'List pending applications',
    description: 'Customer requests assigned to your partner account.',
    language: 'bash',
    code: `curl -s "${PARTNER_V1}/applications?status=pending" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`,
    test: { method: 'GET', url: `${PARTNER_V1}/applications?status=pending` },
  },
  {
    id: 'update-application',
    category: 'applications',
    title: 'Approve application',
    description: 'Update status — customer receives email notification.',
    language: 'bash',
    code: `curl -s -X PATCH "${PARTNER_V1}/applications/APP_ID/status" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"status":"approved","note":"Customer verified"}'`,
    test: {
      method: 'PATCH',
      url: `${PARTNER_V1}/applications/APP_ID/status`,
      body: { status: 'approved', note: 'Customer verified' },
    },
  },
  {
    id: 'dashboard',
    category: 'dashboard',
    title: 'Dashboard statistics',
    description: 'Same stats as partner panel dashboard.',
    language: 'bash',
    code: `curl -s "${PARTNER_V1}/dashboard" \\
  -H "X-API-Key: $MADADGAAR_API_KEY"`,
    test: { method: 'GET', url: `${PARTNER_V1}/dashboard` },
  },
  {
    id: 'create-api-key',
    category: 'api-keys',
    title: 'Create API key (JWT required)',
    description: 'Use partner JWT from login — NOT an API key. For panel automation only.',
    language: 'bash',
    code: `curl -s -X POST "${KEYS_BASE}" \\
  -H "Authorization: Bearer $PARTNER_JWT" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production ERP",
    "scopes": ["installments:read","installments:write","profile:read"],
    "expiresAt": null
  }'`,
    test: {
      method: 'POST',
      url: KEYS_BASE,
      headers: { Authorization: 'Bearer YOUR_PARTNER_JWT' },
      body: {
        name: 'Production ERP',
        scopes: ['installments:read', 'installments:write', 'profile:read'],
        expiresAt: null,
      },
    },
  },
];
