import { Search, Filter, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

export default function DataTable({
  data,
  searchTerm,
  setSearchTerm,
  setSortConfig,
  currentPage,
  setCurrentPage,
  totalPages,
  totalResults,
}) {
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
     
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-800">State-wise Breakdown</h3>
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={16} />
            Filters
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search state..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-xs uppercase tracking-wider font-semibold text-slate-600">
              <th className="p-5">State/UT</th>
              <th className="p-5 cursor-pointer hover:text-slate-900" onClick={() => handleSort('confirmed')}>
                <div className="flex items-center gap-1">
                  Confirmed <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="p-5 cursor-pointer hover:text-slate-900" onClick={() => handleSort('active')}>
                <div className="flex items-center gap-1">
                  Active <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="p-5 cursor-pointer hover:text-slate-900" onClick={() => handleSort('recovered')}>
                <div className="flex items-center gap-1">
                  Recovered <ArrowUpDown size={14} />
                </div>
              </th>
              <th className="p-5 cursor-pointer hover:text-slate-900" onClick={() => handleSort('deaths')}>
                <div className="flex items-center gap-1">
                  Deceased <ArrowUpDown size={14} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-12 text-center text-slate-500">
                  No results found for "{searchTerm}"
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-5 font-medium text-slate-800">{row.state}</td>
                  <td className="p-5 text-slate-700 font-medium">
                    {Number(row.confirmed).toLocaleString()}
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      {Number(row.active).toLocaleString()}
                    </span>
                  </td>
                  <td className="p-5 text-emerald-600 font-medium">
                    {Number(row.recovered).toLocaleString()}
                  </td>
                  <td className="p-5 text-rose-600 font-medium">
                    {Number(row.deaths).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination for table */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-sm">
        <span className="text-slate-600">
          Showing {(currentPage - 1) * 9 + 1} to {Math.min(currentPage * 9, totalResults)} of {totalResults} results
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-slate-300 bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}