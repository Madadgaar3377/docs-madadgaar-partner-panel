const STYLES = {
  GET: 'bg-blue-100 text-blue-800 border-blue-200',
  POST: 'bg-green-100 text-green-800 border-green-200',
  PUT: 'bg-amber-100 text-amber-800 border-amber-200',
  PATCH: 'bg-purple-100 text-purple-800 border-purple-200',
  DELETE: 'bg-red-100 text-red-800 border-red-200',
};

export default function MethodBadge({ method }) {
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold font-mono border ${STYLES[method] || STYLES.GET}`}>
      {method}
    </span>
  );
}
