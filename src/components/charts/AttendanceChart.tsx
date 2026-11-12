import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { AttendanceTrendPoint } from "@/shared/types/domain";

export function AttendanceChart({ data, height = 220 }: { data: AttendanceTrendPoint[]; height?: number }) {
  return (
    <div style={{ height }} role="img" aria-label={`Tren kehadiran: ${data.map((d) => `${d.month} ${d.rate}%`).join(", ")}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="attendanceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} />
          <YAxis domain={[60, 100]} tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} unit="%" />
          <Tooltip
            formatter={(v: number) => [`${v}%`, "Kehadiran"]}
            contentStyle={{ borderRadius: 8, border: "1px solid var(--border)", fontSize: 12 }}
          />
          <Area type="monotone" dataKey="rate" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#attendanceFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
