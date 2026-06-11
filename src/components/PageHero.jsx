export default function PageHero({ badge, title, subtitle, children }) {
  return (
    <header className="hero-mesh border border-red-100 rounded-2xl px-6 py-8 sm:px-8 mb-10">
      {badge && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-madad-600 text-white mb-4 shadow-sm">
          {badge}
        </span>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
      {subtitle && <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">{subtitle}</p>}
      {children}
    </header>
  );
}
