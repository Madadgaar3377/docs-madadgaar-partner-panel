import MethodBadge from './MethodBadge';
import CodeBlock from './CodeBlock';

export default function EndpointCard({
  method,
  path,
  scope,
  description,
  curl,
  body,
  response,
  test,
}) {
  const testConfig = test || (curl && path ? {
    method,
    url: path.startsWith('http') ? path : path,
    body: body ? tryParseJson(body) : undefined,
  } : null);

  return (
    <article className="glass-card p-6 mb-8">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <MethodBadge method={method} />
        <code className="text-sm font-mono text-gray-800 bg-red-50 px-2 py-1 rounded-lg border border-red-100 break-all">{path}</code>
      </div>
      {scope && (
        <p className="text-xs text-gray-500 mb-3">
          Required permission: <code className="text-madad-700 bg-red-50 px-1.5 py-0.5 rounded font-semibold">{scope}</code>
        </p>
      )}
      <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">{description}</p>
      {curl && (
        <CodeBlock title="Example request (curl)" language="bash" test={testConfig}>
          {curl}
        </CodeBlock>
      )}
      {body && (
        <CodeBlock
          title="Request body (JSON)"
          language="json"
          test={testConfig?.body ? { ...testConfig, body: tryParseJson(body) } : testConfig}
        >
          {body}
        </CodeBlock>
      )}
      {response && <CodeBlock title="Example response" language="json" showTest={false}>{response}</CodeBlock>}
    </article>
  );
}

function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}
