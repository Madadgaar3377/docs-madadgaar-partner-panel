import {
  BookOpen,
  Key,
  Shield,
  Layers,
  LayoutDashboard,
  ClipboardList,
  Landmark,
  FileCheck,
  Lock,
  Code2,
  Rocket,
  Activity,
} from 'lucide-react';

export const NAV_SECTIONS = [
  {
    title: 'Introduction',
    items: [
      { path: '/', label: 'Overview', icon: BookOpen },
      { path: '/getting-started', label: 'Getting Started', icon: Rocket },
      { path: '/status', label: 'API Status', icon: Activity },
    ],
  },
  {
    title: 'Core concepts',
    items: [
      { path: '/authentication', label: 'Authentication', icon: Lock },
      { path: '/api-keys', label: 'API Keys', icon: Key },
      { path: '/scopes', label: 'Scopes & Permissions', icon: Shield },
    ],
  },
  {
    title: 'API reference',
    items: [
      { path: '/installments', label: 'Installments', icon: Layers },
      { path: '/loans', label: 'Loans', icon: Landmark },
      { path: '/applications', label: 'Installment applications', icon: ClipboardList },
      { path: '/loan-applications', label: 'Loan applications', icon: FileCheck },
      { path: '/dashboard', label: 'Dashboard & Profile', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Guides',
    items: [
      { path: '/security', label: 'Security', icon: Shield },
      { path: '/examples', label: 'Code Examples', icon: Code2 },
    ],
  },
];

export const ALL_ROUTES = NAV_SECTIONS.flatMap((s) => s.items);
