import { Filter } from 'lucide-react';

export default function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        <button className="text-slate-400 hover:text-slate-600">
          <Filter size={18} />
        </button>
      </div>
      <div className="h-80 w-full">
        {children}
      </div>
    </div>
  );
}