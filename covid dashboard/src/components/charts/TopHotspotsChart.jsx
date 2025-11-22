// Top hotspots graph
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TopHotspotsChart({ data }) {
  const top5 = data
    .filter(s => s.state !== "Total" && s.state !== "State Unassigned")
    .map(s => ({
      state: s.state,
      active: parseInt(s.active) || 0,
      recovered: parseInt(s.recovered) || 0,
    }))
    .sort((a, b) => b.active - a.active)
    .slice(0, 5);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={top5} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
        <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
        <YAxis dataKey="state" type="category" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={120} />
        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', borderColor: '#e2e8f0' }} />
        <Legend />
        <Bar dataKey="active" fill="#f59e0b" radius={[0, 8, 8, 0]} name="Active Cases" barSize={20} />
        <Bar dataKey="recovered" fill="#10b981" radius={[0, 8, 8, 0]} name="Recovered" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}