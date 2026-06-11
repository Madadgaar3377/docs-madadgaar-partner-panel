import { API_TEST_LAB_URL } from '../utils/apiTestLab';
import { ExternalLink, FlaskConical } from 'lucide-react';

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="sticky top-[72px] z-40 -mx-4 px-4 py-3 mb-6 bg-white/95 backdrop-blur border-b border-red-100">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              active === cat.id
                ? 'bg-madad-600 text-white shadow-md'
                : 'bg-red-50 text-madad-700 border border-red-100 hover:bg-red-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
        <a
          href={API_TEST_LAB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          <FlaskConical className="w-4 h-4" />
          Open API Test Lab
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>
    </div>
  );
}
