import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PortfolioChartProps {
  chartData: Array<{
    date: string;
    "Portfolio Value": number;
    "S&P 500 Value": number;
    "Money Invested": number;
  }>;
  monthsPast: number;
}

export function PortfolioChart({ chartData, monthsPast }: PortfolioChartProps) {
  return (
    <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm">
      <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-4">Flight Log Graph</div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              borderRadius: "8px",
            }}
            formatter={(value: number | undefined) => value !== undefined ? `$${value.toFixed(2)}` : "$0.00"}
          />
          <Legend 
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="Portfolio Value"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            name="Portfolio Value"
          />
          <Line
            type="monotone"
            dataKey="S&P 500 Value"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            activeDot={{ r: 6 }}
            name="S&P 500 Value"
          />
          <Line
            type="monotone"
            dataKey="Money Invested"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="3 3"
            dot={false}
            activeDot={{ r: 6 }}
            name="Money Invested"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 text-sm text-cyan-300/60 space-y-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-green-500"></div>
            <span><strong>Green line:</strong> Portfolio value (actual growth)</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-500 border-dashed border-t-2"></div>
            <span><strong>Blue dashed line:</strong> S&P 500 value (actual growth)</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-amber-500 border-dashed border-t-2"></div>
            <span><strong>Amber dashed line:</strong> Money invested (initial capital)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

