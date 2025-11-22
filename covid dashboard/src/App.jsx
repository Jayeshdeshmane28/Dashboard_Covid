import './App.css'
import { useState, useMemo } from 'react';
import { useCovidData } from './hooks/useCovidData';
import Header from './components/layout/Header';
import StatCard from './components/ui/StatCard';
import ChartCard from './components/ui/ChartCard';
import InfectionTrendChart from './components/charts/InfectionTrendChart';
import RecoveryVsDeceasedChart from './components/charts/RecoveryVsDeceasedChart';
import TopHotspotsChart from './components/charts/TopHotspotsChart';
import DataTable from './components/ui/DataTable';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { Users, Activity, Heart, AlertCircle } from 'lucide-react';
import Footer from './components/layout/Footer';


export default function App() {
  const { data, loading } = useCovidData();
  const [timeFilter, setTimeFilter] = useState('30');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'confirmed', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const overview = useMemo(() => data?.statewise?.find(s => s.state === "Total"), [data]);
  const chartData = useMemo(() => {
    if (!data?.cases_time_series) return [];
    let filtered = [...data.cases_time_series];
    if (timeFilter !== 'all') filtered = filtered.slice(-parseInt(timeFilter));
    return filtered.map(d => ({
      date: d.date,
      confirmed: parseInt(d.dailyconfirmed),
      recovered: parseInt(d.dailyrecovered),
      deceased: parseInt(d.dailydeceased),
    }));
  }, [data, timeFilter]);

  const tableData = useMemo(() => {
    let rows = data?.statewise?.filter(s => s.state !== "Total" && s.state !== "State Unassigned") || [];
    if (searchTerm) {
      rows = rows.filter(s => s.state.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    rows.sort((a, b) => {
      const aVal = parseInt(a[sortConfig.key] || 0);
      const bVal = parseInt(b[sortConfig.key] || 0);
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
    return rows;
  }, [data, searchTerm, sortConfig]);

  const currentTableData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Time Filter */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">COVID-19 India Dashboard</h2>
            <p className="text-slate-500 text-sm">Real-time statistics</p>
          </div>
          <div className="flex gap-2 bg-white rounded-lg border p-1">
            {['7', '30', 'all'].map(f => (
              <button key={f} onClick={() => setTimeFilter(f)}
                className={`px-4 py-2 text-sm rounded-md font-medium transition ${timeFilter === f ? 'bg-blue-100 text-blue-700' : 'text-slate-600'}`}>
                {f === 'all' ? 'All Time' : `Last ${f} Days`}
              </button>
            ))}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Confirmed" value={overview?.confirmed} increase={overview?.deltaconfirmed} color="blue" icon={Users} />
          <StatCard title="Active Cases" value={overview?.active} color="amber" icon={Activity} />
          <StatCard title="Recovered" value={overview?.recovered} increase={overview?.deltarecovered} color="emerald" icon={Heart} />
          <StatCard title="Deceased" value={overview?.deaths} increase={overview?.deltadeaths} color="rose" icon={AlertCircle} />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartCard title="Daily Confirmed Trend">
            <InfectionTrendChart data={chartData} />
          </ChartCard>
          <ChartCard title="Recovery vs Deceased">
            <RecoveryVsDeceasedChart data={chartData} />
          </ChartCard>
        </div>

        <ChartCard title="Top 5 Hotspots (Active vs Recovered)">
          <TopHotspotsChart data={data?.statewise || []} />
        </ChartCard>

        <DataTable
          data={currentTableData}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalResults={tableData.length}
        />
      </main>
      <Footer/>
    </div>
    
  );
}