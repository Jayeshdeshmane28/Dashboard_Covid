// Header
import { Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">
            Covid<span className="text-blue-600">Tracker</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-l pl-6 border-slate-200">
           
            <div className="w-9 h-9 bg-slate-300 rounded-full flex items-center justify-center text-sm font-bold text-slate-700">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}