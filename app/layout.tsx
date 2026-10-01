import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track income, expenses and reports",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex bg-slate-50 text-slate-900">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </body>
    </html>
  );
}