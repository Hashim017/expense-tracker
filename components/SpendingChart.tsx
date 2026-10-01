"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatMoney } from "@/lib/format";

type Props = {
  data: { month: string; income: number; expense: number }[];
};

const axisTick = { fill: "#94a3b8", fontSize: 12 };

export default function SpendingChart({ data }: Props) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fb7185" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(255,255,255,0.08)"
          />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={axisTick} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={axisTick}
            tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : String(v))}
          />
          <Tooltip
            formatter={(v) => formatMoney(Number(v))}
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              color: "#e2e8f0",
            }}
            labelStyle={{ color: "#94a3b8" }}
          />
          <Legend iconType="circle" wrapperStyle={{ color: "#94a3b8" }} />
          <Area
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#34d399"
            strokeWidth={2.5}
            fill="url(#gIncome)"
          />
          <Area
            type="monotone"
            dataKey="expense"
            name="Expenses"
            stroke="#fb7185"
            strokeWidth={2.5}
            fill="url(#gExpense)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}