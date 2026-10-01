type Props = {
  title: string;
  amount: string;
  color: string;
};

export default function StatCard({ title, amount, color }: Props) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm border border-slate-200">
      <p className="text-sm text-slate-500">{title}</p>
      <p className={`mt-2 text-2xl font-bold ${color}`}>{amount}</p>
    </div>
  );
}