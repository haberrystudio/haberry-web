"use client";
import { useEffect, useState } from "react";

/** Manual lite mode: stops all motion and drops the heavier effects. Remembered on this device. */
export default function LiteToggle({ label, hint }: { label: string; hint: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(document.documentElement.hasAttribute("data-lite"));
  }, []);

  function toggle() {
    const next = !on;
    setOn(next);
    document.documentElement.toggleAttribute("data-lite", next);
    try {
      localStorage.setItem("haberry-lite", next ? "1" : "0");
    } catch { /* storage may be blocked; the toggle still works for this visit */ }
  }

  return (
    <button type="button" className="lite" aria-pressed={on} onClick={toggle} title={hint}>
      <span className="lite__box" aria-hidden="true" />
      {label}
    </button>
  );
}
