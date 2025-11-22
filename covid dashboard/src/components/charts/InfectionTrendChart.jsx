// Trend chart
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InfectionTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="320">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
        <Tooltip contentStyle={{ borderRadius: '8px', borderColor: '#e2e8f0' }} />
        <Area
          type="monotone"
          dataKey="confirmed"
          stroke="#3b82f6"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorConfirmed)"
          name="Daily Confirmed"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}