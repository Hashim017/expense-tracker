"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export default function DemoButton() {
  const [loading, setLoading] = useState(false);

  async function start() {
    setLoading(true);
    const res = await fetch("/api/auth/demo", {
      method: "POST",
      cache: "no-store",
    });
    if (!res.ok) {
      setLoading(false);
      alert("Demo is not available right now.");
      return;
    }
    window.location.href = "/";
  }

  return (
    <button
      onClick={start}
      disabled={loading}
      className="btn-primary flex items-center gap-2 px-6 py-3 text-base"
    >
      <Play size={16} />
      {loading ? "Loading demo..." : "Try demo"}
    </button>
  );
}