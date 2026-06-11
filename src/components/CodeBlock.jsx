import { useState } from 'react';
import { Copy, Check, FlaskConical } from 'lucide-react';
import { openApiTestLab, DEFAULT_API_HEADERS } from '../utils/apiTestLab';

export default function CodeBlock({
  title,
  children,
  language = 'bash',
  test,
  showTest = true,
}) {
  const [copied, setCopied] = useState(false);
  const text = typeof children === 'string' ? children.trim() : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const handleTest = () => {
    if (!test) return;
    openApiTestLab({
      method: test.method || 'GET',
      url: test.url,
      headers: { ...DEFAULT_API_HEADERS, ...test.headers },
      body: test.body,
    });
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 bg-gray-900 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-gray-800 border-b border-gray-700">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{title || language}</span>
        <div className="flex items-center gap-2">
          {showTest && test && (
            <button
              type="button"
              onClick={handleTest}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-madad-600 hover:bg-madad-500 px-3 py-1.5 rounded-lg transition-colors"
              title="Opens API Test Lab and copies curl to clipboard"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              Test now
            </button>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors bg-gray-700 hover:bg-gray-600 px-2.5 py-1.5 rounded-lg"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-green-400 leading-relaxed max-h-[480px]">
        <code>{text}</code>
      </pre>
    </div>
  );
}
