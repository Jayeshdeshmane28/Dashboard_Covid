// Footer
import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
             
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
                <Activity size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                Covid<span className="text-blue-600">Tracker</span>
              </span>
            </div>
            <div className="text-sm text-slate-500 space-y-1 max-w-md">
              <p>Real-time COVID-19 statistics dashboard for India.</p>
            </div>
          </div>

          <div className="hidden md:block"></div>
        </div>

      
        <div className="border-t border-slate-200 py-6 text-center">
          <p className="text-xs text-slate-500 font-medium">
            © 2025 CovidTracker By Jayesh Deshmane
          </p>
        </div>
      </div>
    </footer>
  );
}