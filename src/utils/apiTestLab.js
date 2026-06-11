export const API_TEST_LAB_URL = 'https://www.apitestlab.org/tester';

export function buildCurl({ method = 'GET', url, headers = {}, body }) {
  const lines = [`curl -s -X ${method} "${url}"`];
  Object.entries(headers).forEach(([key, value]) => {
    lines.push(`  -H "${key}: ${value}"`);
  });
  if (body && method !== 'GET') {
    const json = typeof body === 'string' ? body : JSON.stringify(body, null, 2);
    lines.push(`  -H "Content-Type: application/json"`);
    lines.push(`  -d '${json.replace(/'/g, "'\\''")}'`);
  }
  return lines.join(' \\\n');
}

export function openApiTestLab({ method, url, headers = {}, body }) {
  const params = new URLSearchParams();
  params.set('url', url);
  params.set('method', method || 'GET');
  if (headers.Authorization) params.set('auth', headers.Authorization);
  if (headers['X-API-Key']) params.set('apiKey', headers['X-API-Key']);
  if (body && method !== 'GET') {
    params.set('body', typeof body === 'string' ? body : JSON.stringify(body));
  }

  const testerUrl = `${API_TEST_LAB_URL}?${params.toString()}`;

  try {
    const curl = buildCurl({
      method,
      url,
      headers: { 'Content-Type': 'application/json', ...headers },
      body,
    });
    navigator.clipboard.writeText(curl);
  } catch {
    /* clipboard optional */
  }

  window.open(testerUrl, '_blank', 'noopener,noreferrer');
}

export const DEFAULT_API_HEADERS = {
  Authorization: 'Bearer mg_live_YOUR_API_KEY_HERE',
};
