import { useState, useMemo } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, Search, BookOpen } from 'lucide-react';
import { NAV_SECTIONS } from '../constants/navigation';
import { PARTNER_PANEL, MAIN_SITE } from '../constants/api';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
      isActive
        ? 'bg-madad-600 text-white font-semibold shadow-sm'
        : 'text-gray-600 hover:text-madad-700 hover:bg-red-50'
    }`;

  const filteredSections = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return NAV_SECTIONS;
    return NAV_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.path.toLowerCase().includes(q)
      ),
    })).filter((s) => s.items.length > 0);
  }, [search]);

  const currentPage = NAV_SECTIONS.flatMap((s) => s.items).find(
    (i) => i.path === location.pathname || (i.path !== '/' && location.pathname.startsWith(i.path))
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="sticky top-0 z-50 border-b border-red-100 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-[72px] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/madadgaar-logo.png"
              alt="Madadgaar Expert Partner"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block border-l border-red-100 pl-3">
              <p className="font-bold text-madad-700 leading-tight text-sm">API Documentation</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Developer Guide</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/getting-started"
              className="text-sm font-medium text-white bg-madad-600 hover:bg-madad-700 px-4 py-2 rounded-lg transition-colors"
            >
              Quick Start
            </Link>
            <a href={PARTNER_PANEL} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-madad-600 flex items-center gap-1">
              Partner Panel <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <button type="button" className="md:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex gap-8">
        <aside className={`${mobileOpen ? 'block' : 'hidden'} md:block w-full md:w-72 shrink-0`}>
          <div className="sticky top-[88px] space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search docs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-red-100 rounded-xl bg-red-50/30 focus:outline-none focus:ring-2 focus:ring-madad-500/30 focus:border-madad-300"
              />
            </div>

            <nav className="space-y-5">
              {filteredSections.map((section) => (
                <div key={section.title}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-madad-600 mb-2 px-3">{section.title}</p>
                  <ul className="space-y-0.5">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li key={item.path}>
                          <NavLink to={item.path} end={item.path === '/'} className={navLinkClass} onClick={() => setMobileOpen(false)}>
                            <Icon className="w-4 h-4 shrink-0" />
                            {item.label}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="glass-card p-4 mt-4">
              <div className="flex items-center gap-2 text-madad-700 font-semibold text-sm mb-2">
                <BookOpen className="w-4 h-4" />
                Need a key?
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                Generate API keys from the partner panel after admin verification.
              </p>
              <a
                href={`${PARTNER_PANEL}/settings/api-keys`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-madad-600 hover:text-madad-700"
              >
                Open API Keys →
              </a>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 max-w-3xl lg:max-w-4xl pb-16">
          {currentPage && location.pathname !== '/' && (
            <nav className="text-sm text-gray-400 mb-4 flex items-center gap-2">
              <Link to="/" className="hover:text-madad-600">Docs</Link>
              <span>/</span>
              <span className="text-gray-700 font-medium">{currentPage.label}</span>
            </nav>
          )}
          <Outlet />
        </main>
      </div>

      <footer className="border-t border-red-100 bg-red-50/50 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/madadgaar-logo.png" alt="Madadgaar" className="h-8 w-auto opacity-90" />
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Madadgaar Expert Partner</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <a href={MAIN_SITE} className="hover:text-madad-600">madadgaar.com.pk</a>
            <a href={PARTNER_PANEL} className="hover:text-madad-600">Partner Panel</a>
            <Link to="/getting-started" className="hover:text-madad-600">Getting Started</Link>
            <Link to="/security" className="hover:text-madad-600">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
