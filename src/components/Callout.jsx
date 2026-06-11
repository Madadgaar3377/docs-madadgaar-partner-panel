import { AlertTriangle, Info, CheckCircle2, Zap, Lightbulb } from 'lucide-react';

const VARIANTS = {
  info: { icon: Info, border: 'border-blue-200', bg: 'bg-blue-50', iconColor: 'text-blue-600', title: 'text-blue-900' },
  warning: { icon: AlertTriangle, border: 'border-amber-200', bg: 'bg-amber-50', iconColor: 'text-amber-600', title: 'text-amber-900' },
  success: { icon: CheckCircle2, border: 'border-green-200', bg: 'bg-green-50', iconColor: 'text-green-600', title: 'text-green-900' },
  tip: { icon: Zap, border: 'border-red-200', bg: 'bg-red-50', iconColor: 'text-madad-600', title: 'text-madad-800' },
  learn: { icon: Lightbulb, border: 'border-red-200', bg: 'bg-gradient-to-r from-red-50 to-white', iconColor: 'text-madad-600', title: 'text-gray-900' },
};

export default function Callout({ variant = 'info', title, children }) {
  const v = VARIANTS[variant] || VARIANTS.info;
  const Icon = v.icon;
  return (
    <div className={`my-6 p-5 rounded-xl border ${v.border} ${v.bg}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${v.iconColor}`} />
        <div>
          {title && <p className={`font-bold mb-2 ${v.title}`}>{title}</p>}
          <div className="text-sm leading-relaxed text-gray-600">{children}</div>
        </div>
      </div>
    </div>
  );
}
