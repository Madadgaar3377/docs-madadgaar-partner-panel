import { PARTNER_V1, KEYS_BASE, API_BASE } from './api';

export const EXAMPLE_CATEGORIES = [
  { id: 'all', label: 'All examples' },
  { id: 'general', label: 'General / Auth' },
  { id: 'installments', label: 'Installments' },
  { id: 'applications', label: 'Installment applications' },
  { id: 'loans', label: 'Loans' },
  { id: 'loan-applications', label: 'Loan applications' },
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
        financeInfo: 'Shariah-compliant plan  no hidden charges',
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
          planName: '128GB  6 Month',
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
  { field: 'customCategory', type: 'string', required: false, description: 'Use when category is "other"  your custom category label.' },
  { field: 'city', type: 'string', required: true, description: 'City where product is available (Karachi, Lahore, etc.).' },
  { field: 'price', type: 'number', required: true, description: 'Base cash price. Can be 0 if all pricing is in variants only.' },
  { field: 'description', type: 'string', required: false, description: 'Long product description  warranty, condition, box contents.' },
  { field: 'productImages', type: 'string[]', required: false, description: 'Array of HTTPS image URLs (upload images via partner panel upload API first).' },
  { field: 'videoUrl', type: 'string', required: false, description: 'Optional YouTube or product video URL.' },
  { field: 'companyName', type: 'string', required: false, description: 'Your company display name on the listing.' },
  { field: 'postedBy', type: 'string', required: false, description: 'Set to "Partner" for partner-created listings.' },
  { field: 'status', type: 'string', required: false, description: 'Defaults to pending  admin approves before public catalog shows product.' },
  { field: 'downpayment', type: 'number', required: false, description: 'Legacy global down payment field (optional if plans define downPayment).' },
  { field: 'tenure', type: 'string', required: false, description: 'Human tenure label for simple listings.' },
  { field: 'productSpecifications', type: 'object', required: false, description: 'Category specs: { category, subCategory, specifications: [{ field, value }] }.' },
  { field: 'paymentPlans', type: 'array', required: false, description: 'Payment plans on the base product (not tied to a variant). See plan fields below.' },
  { field: 'variants', type: 'array', required: false, description: 'RAM/storage/color options  each variant has price, discountPercent, and optional paymentPlans.' },
  { field: 'finance', type: 'object', required: false, description: 'Product-level finance: { bankName, financeInfo }  bank partnership info.' },
];

export const COMPLETE_CREATE_LOAN = {
  productName: 'Personal Loan - Salaried',
  bankName: 'Partner Bank Ltd',
  majorCategory: 'Personal Financing',
  subCategory: 'Emergency / Personal Needs',
  minFinancingAmount: 50000,
  maxFinancingAmount: 2000000,
  minTenure: 12,
  maxTenure: 60,
  tenureUnit: 'Months',
  financingType: 'Islamic',
  indicativeRate: '12% - 18%',
  rateType: 'Floating',
  description: 'Fast approval for salaried individuals. Shariah-compliant profit-based structure.',
  planImage: 'https://cdn.example.com/loans/personal-loan-banner.jpg',
  planDocument: 'https://cdn.example.com/loans/personal-loan-terms.pdf',
  targetAudience: ['Salaried Individuals'],
  eligibility: {
    minAge: 21,
    maxAge: 60,
    minIncome: 50000,
    employmentType: ['Salaried'],
    requiredDocuments: ['CNIC', 'Salary Slip', 'Bank Statement'],
  },
};

export const LOAN_MAJOR_CATEGORIES = [
  'Home / Real Estate Financing',
  'Auto Financing',
  'Personal Financing',
  'Business / SME Financing',
  'Other / Specialized Financing',
  'Installment / Buy-Now-Pay-Later Plans',
  'Shariah-Compliant / Islamic Plans',
];

export const LOAN_FIELD_REFERENCE = [
  { field: 'productName', type: 'string', required: true, description: 'Display name e.g. "Personal Loan - Salaried", "Auto Ijarah".' },
  { field: 'bankName', type: 'string', required: true, description: 'Bank or finance company name shown to customers.' },
  { field: 'majorCategory', type: 'string', required: true, description: 'One of the major category enum values (see Loans page).' },
  { field: 'subCategory', type: 'string', required: false, description: 'Sub-type e.g. "Car (New / Used)", "Home Purchase".' },
  { field: 'minFinancingAmount', type: 'number', required: false, description: 'Minimum loan amount in PKR.' },
  { field: 'maxFinancingAmount', type: 'number', required: false, description: 'Maximum loan amount in PKR.' },
  { field: 'minTenure', type: 'number', required: false, description: 'Minimum tenure in tenureUnit.' },
  { field: 'maxTenure', type: 'number', required: false, description: 'Maximum tenure in tenureUnit.' },
  { field: 'tenureUnit', type: 'string', required: false, description: 'Months | Years | Days  defaults to Months.' },
  { field: 'financingType', type: 'string', required: false, description: 'Conventional | Islamic.' },
  { field: 'indicativeRate', type: 'string', required: false, description: 'Human-readable rate e.g. "8% - 12% Floating".' },
  { field: 'rateType', type: 'string', required: false, description: 'Fixed | Variable | Floating.' },
  { field: 'eligibility', type: 'object', required: false, description: '{ minAge, maxAge, minIncome, employmentType[], requiredDocuments[] }.' },
  { field: 'targetAudience', type: 'string[]', required: false, description: 'Salaried Individuals, Business Owners, SME / Entrepreneurs, Students, Other.' },
  { field: 'description', type: 'string', required: false, description: 'Long description, terms, and marketing copy.' },
  { field: 'planImage', type: 'string', required: false, description: 'HTTPS URL  upload via partner panel first.' },
  { field: 'planDocument', type: 'string', required: false, description: 'HTTPS URL to PDF terms sheet.' },
  { field: 'planId', type: 'string', required: false, description: 'Read-only  auto-generated 6-digit ID on create. Use for customer apply.' },
  { field: 'createdBy', type: 'string', required: false, description: 'Auto-filled from API key  do not send another partner ID.' },
];

export const LOAN_APPLICATION_STATUS = [
  { field: 'pending', type: 'status', required: false, description: 'New application  default when customer applies.' },
  { field: 'in_progress', type: 'status', required: false, description: 'Under review / processing.' },
  { field: 'approved', type: 'status', required: false, description: 'Approved  customer notified by email.' },
  { field: 'rejected', type: 'status', required: false, description: 'Rejected  customer notified by email.' },
  { field: 'cancelled', type: 'status', required: false, description: 'Cancelled by customer or partner.' },
];

export const CUSTOMER_APPLY_LOAN_BODY = {
  planId: '123456',
  applicantInfo: {
    fullName: 'Ali Ahmed Khan',
    fatherOrHusbandName: 'Muhammad Khan',
    cnicNumber: '42101-1234567-1',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    maritalStatus: 'Married',
    address: { street: 'Block 5', city: 'Karachi', province: 'Sindh' },
  },
  contactInfo: {
    mobileNumber: '03001234567',
    email: 'ali@example.com',
    city: 'Karachi',
  },
  incomeDetails: {
    monthlyIncome: 120000,
    employmentType: 'Salaried',
    employerName: 'ABC Pvt Ltd',
  },
  loanRequirement: {
    loanAmount: 500000,
    loanType: 'Personal Loan',
    tenureMonths: 36,
    purpose: 'Home renovation',
  },
};

export const PAYMENT_PLAN_FIELDS = [
  { field: 'planName', type: 'string', required: true, description: 'Label shown to customers, e.g. "12 Month Plan".' },
  { field: 'cashPrice', type: 'number', required: false, description: 'Cash price this plan is based on.' },
  { field: 'installmentPrice', type: 'number', required: true, description: 'Total deal / installment price  must be > 0.' },
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
    title: 'Test API key  GET /me',
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
    description: 'Paginated list  same data as partner panel "View All Plans".',
    language: 'bash',
    code: `curl -s "${PARTNER_V1}/installments?page=1&limit=20" \\
  -H "X-API-Key: $MADADGAAR_API_KEY"`,
    test: { method: 'GET', url: `${PARTNER_V1}/installments?page=1&limit=20` },
  },
  {
    id: 'create-installment-full',
    category: 'installments',
    title: 'Create installment  complete payload',
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
    description: 'Update status  customer receives email notification.',
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
    id: 'list-loans',
    category: 'loans',
    title: 'List loan plans',
    description: 'Paginated list  same data as partner panel Loans page.',
    language: 'bash',
    code: `curl -s "${PARTNER_V1}/loans?page=1&limit=20" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`,
    test: { method: 'GET', url: `${PARTNER_V1}/loans?page=1&limit=20` },
  },
  {
    id: 'create-loan-full',
    category: 'loans',
    title: 'Create loan plan  complete payload',
    description: 'Full example matching partner panel create loan form. Response includes planId for customer apply.',
    language: 'bash',
    getCode() {
      return `curl -s -X POST "${PARTNER_V1}/loans" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(COMPLETE_CREATE_LOAN)}'`;
    },
    test: {
      method: 'POST',
      url: `${PARTNER_V1}/loans`,
      body: COMPLETE_CREATE_LOAN,
    },
  },
  {
    id: 'get-loan',
    category: 'loans',
    title: 'Get one loan plan',
    description: 'Use 6-digit planId from create response or MongoDB _id.',
    language: 'bash',
    code: `curl -s "${PARTNER_V1}/loans/123456" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`,
    test: { method: 'GET', url: `${PARTNER_V1}/loans/123456` },
  },
  {
    id: 'update-loan',
    category: 'loans',
    title: 'Update loan plan',
    description: 'Update any allowed field. Cannot change planId or createdBy.',
    language: 'bash',
    code: `curl -s -X PUT "${PARTNER_V1}/loans/123456" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"description":"Updated terms","indicativeRate":"10% - 15%"}'`,
    test: {
      method: 'PUT',
      url: `${PARTNER_V1}/loans/123456`,
      body: { description: 'Updated terms', indicativeRate: '10% - 15%' },
    },
  },
  {
    id: 'delete-loan',
    category: 'loans',
    title: 'Delete loan plan',
    description: 'Permanently deletes a loan plan you own.',
    language: 'bash',
    code: `curl -s -X DELETE "${PARTNER_V1}/loans/123456" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`,
    test: { method: 'DELETE', url: `${PARTNER_V1}/loans/123456` },
  },
  {
    id: 'customer-apply-loan',
    category: 'loan-applications',
    title: 'Customer apply  POST /api/applyLoan (not Partner API)',
    description: 'Customers use their Madadgaar JWT. Partners manage leads via /loan-applications.',
    language: 'bash',
    getCode() {
      return `curl -s -X POST "${API_BASE}/applyLoan" \\
  -H "Authorization: Bearer $CUSTOMER_JWT" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(CUSTOMER_APPLY_LOAN_BODY)}'`;
    },
    test: null,
  },
  {
    id: 'list-loan-applications',
    category: 'loan-applications',
    title: 'List pending loan applications',
    description: 'Applications on loan plans you created. Optional ?planId= filter.',
    language: 'bash',
    code: `curl -s "${PARTNER_V1}/loan-applications?status=pending&page=1&limit=20" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`,
    test: { method: 'GET', url: `${PARTNER_V1}/loan-applications?status=pending` },
  },
  {
    id: 'get-loan-application',
    category: 'loan-applications',
    title: 'Get loan application detail',
    description: 'Full applicant info, loan requirement, assigned agent. Use 6-digit applicationId or MongoDB _id.',
    language: 'bash',
    code: `curl -s "${PARTNER_V1}/loan-applications/482910" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`,
    test: { method: 'GET', url: `${PARTNER_V1}/loan-applications/482910` },
  },
  {
    id: 'update-loan-application',
    category: 'loan-applications',
    title: 'Approve loan application',
    description: 'Update status  customer receives email notification.',
    language: 'bash',
    code: `curl -s -X PATCH "${PARTNER_V1}/loan-applications/482910/status" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"status":"approved","note":"Customer verified"}'`,
    test: {
      method: 'PATCH',
      url: `${PARTNER_V1}/loan-applications/482910/status`,
      body: { status: 'approved', note: 'Customer verified' },
    },
  },
  {
    id: 'delete-loan-application',
    category: 'loan-applications',
    title: 'Delete loan application',
    description: 'Only pending, rejected, or cancelled applications.',
    language: 'bash',
    code: `curl -s -X DELETE "${PARTNER_V1}/loan-applications/482910" \\
  -H "Authorization: Bearer $MADADGAAR_API_KEY"`,
    test: { method: 'DELETE', url: `${PARTNER_V1}/loan-applications/482910` },
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
    description: 'Use partner JWT from login  NOT an API key. For panel automation only.',
    language: 'bash',
    code: `curl -s -X POST "${KEYS_BASE}" \\
  -H "Authorization: Bearer $PARTNER_JWT" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production ERP",
    "scopes": ["installments:read","installments:write","loans:read","loans:write","loan-applications:read","loan-applications:write","profile:read"],
    "expiresAt": null
  }'`,
    test: {
      method: 'POST',
      url: KEYS_BASE,
      headers: { Authorization: 'Bearer YOUR_PARTNER_JWT' },
      body: {
        name: 'Production ERP',
        scopes: [
          'installments:read',
          'installments:write',
          'loans:read',
          'loans:write',
          'loan-applications:read',
          'loan-applications:write',
          'profile:read',
        ],
        expiresAt: null,
      },
    },
  },
];
