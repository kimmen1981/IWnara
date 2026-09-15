"use client";

import { useState } from "react";

export function CopySwish({ number }: { number: string }) {
  const [message, setMessage] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(number.replaceAll(" ", ""));
      setMessage("Swishnumret är kopierat.");
    } catch {
      setMessage(`Kopiera numret manuellt: ${number}`);
    }
  }

  return <>
    <button type="button" onClick={copy} className="button button-light w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Kopiera Swishnummer</button>
    <p role="status" className="mt-3 min-h-10 text-sm text-muted">{message}</p>
  </>;
}
