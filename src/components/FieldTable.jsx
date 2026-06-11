export default function FieldTable({ rows, title }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-red-100 shadow-sm">
      {title && <div className="bg-red-50 px-4 py-2 border-b border-red-100 font-bold text-madad-800 text-sm">{title}</div>}
      <table className="w-full text-sm">
        <thead className="bg-white text-gray-500 border-b border-red-50">
          <tr>
            <th className="text-left p-3 font-semibold">Field</th>
            <th className="text-left p-3 font-semibold">Type</th>
            <th className="text-left p-3 font-semibold">Required</th>
            <th className="text-left p-3 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-red-50 bg-white">
          {rows.map((row) => (
            <tr key={row.field} className="hover:bg-red-50/30">
              <td className="p-3 font-mono text-madad-700 text-xs font-semibold whitespace-nowrap">{row.field}</td>
              <td className="p-3 font-mono text-gray-500 text-xs">{row.type}</td>
              <td className="p-3">
                {row.required ? (
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Yes</span>
                ) : (
                  <span className="text-xs text-gray-400">No</span>
                )}
              </td>
              <td className="p-3 text-gray-600 text-[14px] leading-relaxed">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
