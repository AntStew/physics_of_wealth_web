import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { EngineType } from "@/lib/types";
import { formatCurrencyChart } from "@/lib/formatCurrency";

interface ProjectionChartProps {
  chartData: Array<{
    date: string;
    "Portfolio Value": number;
    "Goal": number;
  }>;
  engineType: EngineType;
}

export function ProjectionChart({ chartData, engineType }: ProjectionChartProps) {
  return (
    <div className="relative bg-black/40 border border-cyan-500/30 rounded-lg p-6 backdrop-blur-sm flex flex-col h-full">
      <div className="text-xs text-cyan-400/70 uppercase tracking-widest mb-4">
        Projected Growth Path
      </div>
      
      <div className="flex-1 min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
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
              tickFormatter={(value) => formatCurrencyChart(value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "8px",
              }}
              formatter={(value: number | undefined) => 
                value !== undefined ? formatCurrencyChart(value) : "$0"
              }
            />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="Portfolio Value"
              stroke="#60a5fa"
              strokeWidth={3}
              dot={false}
              name="Portfolio Value"
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Goal"
              stroke="#2563eb"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Goal"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-cyan-300/60 space-y-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-400"></div>
            <span><strong>Light blue line:</strong> Portfolio value (projected growth)</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-600 border-dashed border-t-2"></div>
            <span><strong>Dark blue dashed line:</strong> Goal target</span>
          </div>
        </div>
        <p className="mt-2 text-xs">
          <strong>Note:</strong> Projection accounts for engine type volatility. 
          Higher yield engines show significant year-to-year variation, 
          while lower yield engines provide more consistent returns.
        </p>
      </div>
    </div>
  );
}

