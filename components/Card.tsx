type Props = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export default function Card({ title, action, children, className = "" }: Props) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}