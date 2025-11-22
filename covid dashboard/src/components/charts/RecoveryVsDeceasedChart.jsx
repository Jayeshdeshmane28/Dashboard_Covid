// Recovery/Decreased graph
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function RecoveryVsDeceasedChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="320">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ borderRadius: '8px', borderColor: '#e2e8f0' }} />
        <Legend />
        <Line
          type="monotone"
          dataKey="recovered"
          stroke="#10b981"
          strokeWidth={2.5}
          dot={false}
          name="Daily Recovered"
        />
        <Line
          type="monotone"
          dataKey="deceased"
          stroke="#ef4444"
          strokeWidth={2.5}
          dot={false}
          name="Daily Deceased"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}