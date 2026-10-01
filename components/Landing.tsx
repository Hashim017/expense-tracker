import Link from "next/link";
import {
  Wallet,
  ArrowLeftRight,
  BarChart3,
  ShieldCheck,
  UserPlus,
  PlusCircle,
  LineChart,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";
import DemoButton from "@/components/DemoButton";

const features = [
  {
    icon: ArrowLeftRight,
    title: "Track money",
    text: "Add income and expenses in seconds. Edit, search and filter any time.",
  },
  {
    icon: BarChart3,
    title: "Clear charts",
    text: "See income, spending and categories in smooth, easy charts.",
  },
  {
    icon: LineChart,
    title: "Monthly reports",
    text: "Compare 3, 6 or 12 months and see your savings rate.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    text: "Every user has their own account. You only see your own data.",
  },
];

const steps = [
  { icon: UserPlus, title: "Create an account", text: "Or try the demo with one click." },
  { icon: PlusCircle, title: "Add transactions", text: "Log your income and expenses." },
  { icon: BarChart3, title: "See the full picture", text: "Charts and reports update at once." },
];

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-900/50">
        <Wallet size={18} />
      </span>
      <span className="text-lg font-bold text-white">ExpenseTracker</span>
    </div>
  );
}

function Preview() {
  return (
    <div className="relative mx-auto mt-14 max-w-4xl">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-emerald-400/20 blur-3xl" />
      <div className="card relative p-4 text-left sm:p-6">
        <div className="mb-4 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-3">
            <Wallet size={16} className="text-white/80" />
            <p className="mt-2 text-xs text-indigo-100">Balance</p>
            <p className="text-lg font-bold text-white">$12,480</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <TrendingUp size={16} className="text-emerald-300" />
            <p className="mt-2 text-xs text-slate-400">Income</p>
            <p className="text-lg font-bold text-emerald-300">$4,200</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <TrendingDown size={16} className="text-rose-300" />
            <p className="mt-2 text-xs text-slate-400">Expenses</p>
            <p className="text-lg font-bold text-rose-300">$2,150</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <PiggyBank size={16} className="text-sky-300" />
            <p className="mt-2 text-xs text-slate-400">Savings</p>
            <p className="text-lg font-bold text-sky-300">49%</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white/5 p-4">
          <svg viewBox="0 0 400 110" className="h-32 w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fb7185" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 70 C50 40 90 60 140 35 S240 55 290 25 S370 40 400 20 L400 110 L0 110Z" fill="url(#lg1)" />
            <path d="M0 70 C50 40 90 60 140 35 S240 55 290 25 S370 40 400 20" fill="none" stroke="#34d399" strokeWidth="2.5" />
            <path d="M0 90 C60 75 100 85 150 65 S250 80 300 60 S370 75 400 55 L400 110 L0 110Z" fill="url(#lg2)" />
            <path d="M0 90 C60 75 100 85 150 65 S250 80 300 60 S370 75 400 55" fill="none" stroke="#fb7185" strokeWidth="2.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
      {/* Header */}
      <header className="sticky top-3 z-30 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur">
        <Brand />
        <nav className="hidden items-center gap-6 text-sm text-slate-400 sm:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how" className="hover:text-white">How it works</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
          >
            Log in
          </Link>
          <Link href="/register" className="btn-primary">
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-2 pt-16 text-center sm:pt-24">
        <p className="mb-5 inline-block rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-1 text-xs font-medium text-indigo-200">
          Personal finance, made simple
        </p>
        <h1 className="bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          Know where your
          <br />
          money goes
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-slate-400 sm:text-lg">
          Track income and expenses, see clear charts, and read monthly reports
          in one clean dashboard.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <DemoButton />
          <Link
            href="/register"
            className="rounded-lg border border-white/15 px-6 py-3 text-base font-medium text-slate-200 hover:bg-white/5"
          >
            Register free
          </Link>
        </div>
        <p className="mt-4 text-xs text-slate-500">No sign up needed for the demo.</p>
        <Preview />
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 pt-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white">Everything you need</h2>
          <p className="mt-2 text-slate-400">Simple tools. No clutter.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6 transition hover:-translate-y-1">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/15 text-indigo-300">
                <Icon size={22} />
              </span>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-24 pt-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white">How it works</h2>
          <p className="mt-2 text-slate-400">Three easy steps.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="card relative p-6">
              <span className="absolute right-5 top-4 text-4xl font-bold text-white/5">
                {i + 1}
              </span>
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                <Icon size={20} />
              </span>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final call to action */}
      <section className="py-24">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-12 text-center shadow-2xl shadow-indigo-900/40">
          <h2 className="text-3xl font-bold text-white">Ready to see it in action?</h2>
          <p className="mx-auto mt-3 max-w-md text-indigo-100">
            Open the demo account and explore every page in seconds.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/login"
              className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-indigo-700 hover:bg-indigo-50"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Brand />
          <p className="text-sm text-slate-500">
            Built with Next.js, Prisma and Recharts.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <Link href="/login" className="hover:text-white">Log in</Link>
            <Link href="/register" className="hover:text-white">Register</Link>
            <a
              href="https://github.com/your-name/expense-tracker"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}