// State-wise Breakdown table
import { ArrowUp } from 'lucide-react';

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  amber: 'bg-amber-100 text-amber-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  rose: 'bg-rose-100 text-rose-600',
};

export default function StatCard({ title, value, increase, color, icon: Icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={`p-4 rounded-full ${colorClasses[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">
          {value ? Number(value).toLocaleString() : '—'}
        </h3>
        {increase && (
          <p className={`text-xs font-medium mt-1 flex items-center gap-1 text-${color}-600`}>
            <ArrowUp size={14} />
            +{Number(increase).toLocaleString()} New
          </p>
        )}
      </div>
    </div>
  );
}