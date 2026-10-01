import StatCard from "@/components/StatCard";
import SpendingChart from "@/components/SpendingChart";

const chartData = [
  { month: "Apr", income: 4200, expense: 2800 },
  { month: "May", income: 4500, expense: 3100 },
  { month: "Jun", income: 4300, expense: 2600 },
  { month: "Jul", income: 4800, expense: 3500 },
  { month: "Aug", income: 5000, expense: 3200 },
  { month: "Sep", income: 5200, expense: 3000 },
];

const recent = [
  { id: 1, title: "Salary", category: "Income", date: "Sep 28", amount: "+$5,200", type: "income" },
  { id: 2, title: "Groceries", category: "Food", date: "Sep 27", amount: "-$180", type: "expense" },
  { id: 3, title: "Electricity bill", category: "Utilities", date: "Sep 25", amount: "-$95", type: "expense" },
  { id: 4, title: "Freelance work", category: "Income", date: "Sep 22", amount: "+$400", type: "income" },
  { id: 5, title: "Fuel", category: "Transport", date: "Sep 20", amount: "-$60", type: "expense" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="mt-1 text-slate-500">Your money at a glance.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Income" amount="$5,600" color="text-emerald-600" />
        <StatCard title="Total Expenses" amount="$3,335" color="text-rose-600" />
        <StatCard title="Balance" amount="$2,265" color="text-slate-900" />
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-semibold">Income vs Expenses</h3>
        <SpendingChart data={chartData} />
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-semibold">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr>
                <th className="py-2">Title</th>
                <th className="py-2">Category</th>
                <th className="py-2">Date</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((t) => (
                <tr key={t.id} className="border-t border-slate-100">
                  <td className="py-3">{t.title}</td>
                  <td className="py-3">{t.category}</td>
                  <td className="py-3">{t.date}</td>
                  <td
                    className={`py-3 text-right font-medium ${
                      t.type === "income" ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}