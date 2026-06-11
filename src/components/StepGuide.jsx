export default function StepGuide({ steps }) {
  return (
    <div className="space-y-6 my-8">
      {steps.map((step, index) => (
        <div key={step.title} className="flex gap-4 p-5 rounded-2xl border border-red-100 bg-gradient-to-r from-white to-red-50/40">
          <div className="step-number">{index + 1}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-3">{step.description}</p>
            {step.detail && <p className="text-sm text-gray-500 leading-relaxed">{step.detail}</p>}
            {step.children}
          </div>
        </div>
      ))}
    </div>
  );
}
