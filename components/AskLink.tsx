"use client";
import type { ServiceId } from "../content/types";
import { chooseService } from "./Starter";

export default function AskLink({ id, label }: { id: ServiceId; label: string }) {
  return (
    <a className="ask" href="#contact" onClick={() => chooseService(id)}>
      {label} <span aria-hidden="true">→</span>
    </a>
  );
}
