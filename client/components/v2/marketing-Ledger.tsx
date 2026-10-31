import * as React from "react";

export type LedgerItem = { title: string; body: React.ReactNode; num?: string };

/** Ruled rows for the marketing group: H3 on the left, its sentence on the right (sf-ledger is exempt from the Smart Brevity paragraph rule). */
export function MarketingLedger({ items, label }: { items: LedgerItem[]; label?: string }) {
  return (
    <div className="sf-ledger" role={label ? "group" : undefined} aria-label={label}>
      {items.map((it) => (
        <div className="sf-lrow" key={it.title}>
          <h3 className="sf-h4">{it.num && <span className="sf-mono" style={{ color: "var(--orange-text)", marginRight: 10 }}>{it.num}</span>}{it.title}</h3>
          <p>{it.body}</p>
        </div>
      ))}
    </div>
  );
}
