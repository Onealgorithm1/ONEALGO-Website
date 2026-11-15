import * as React from "react";

/* Shared by the AI automation and Agentforce pages (2026-11-15): the visible data table of the Salesforce integration
 * page (same classes, same phone stacking), copied here so that page stays untouched. One <style> per page. */
export const TABLE_CSS = `
.sfv2 .sf-int-table{width:100%;border-collapse:collapse;font-size:16px;line-height:1.45;color:var(--ink2)}
.sfv2 .sf-int-table th,.sfv2 .sf-int-table td{text-align:left;vertical-align:top;padding:16px 16px 16px 0;border-top:1px solid var(--hair-s)}
.sfv2 .sf-int-table th:first-child{padding-left:8px}
.sfv2 .sf-int-table thead th{font:500 12px/1.4 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);border-top:0;padding-top:0;padding-bottom:10px}
.sfv2 .sf-int-table tbody th{font:700 19px/1.25 var(--display);letter-spacing:-.01em;color:var(--ink)}
.sfv2 .sf-int-table td.sf-int-pat{font:500 13px/1.5 var(--mono);letter-spacing:.02em;color:var(--ink3)}
.sfv2 .sf-int-table tbody tr:last-child th,.sfv2 .sf-int-table tbody tr:last-child td{border-bottom:1px solid var(--hair-s)}
.sfv2 .sf-int-table tbody tr{transition:background-color .15s}
@media (hover:hover){.sfv2 .sf-int-table tbody tr:hover{background:var(--tint)}}
.sfv2 .sf-int-sm{font-size:15px}
.sfv2 .sf-int-sm th:first-child{padding-left:0}
.sfv2 .sf-int-sm tbody th{font:600 15px/1.4 var(--body)}
.sfv2 .sf-int-sm th,.sfv2 .sf-int-sm td{padding:10px 12px 10px 0}
@media (max-width:767px){
.sfv2 .sf-int-table thead{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.sfv2 .sf-int-table,.sfv2 .sf-int-table tbody,.sfv2 .sf-int-table tr,.sfv2 .sf-int-table th,.sfv2 .sf-int-table td{display:block}
.sfv2 .sf-int-table tbody tr{border-top:1px solid var(--hair-s);padding:14px 0}
.sfv2 .sf-int-table tbody tr:last-child{border-bottom:1px solid var(--hair-s)}
.sfv2 .sf-int-table th,.sfv2 .sf-int-table td,.sfv2 .sf-int-table th:first-child,.sfv2 .sf-int-table tbody tr:last-child th,.sfv2 .sf-int-table tbody tr:last-child td{border:0;padding:4px 0}
.sfv2 .sf-int-table td[data-label]::before{content:attr(data-label);display:block;font:500 11px/1.4 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);margin-bottom:2px}
}
.sfv2 #ev-int-sources .sf-ev-sources .sf-mono{overflow-wrap:anywhere}`;


export function DataTable({ id, label, head, rows, small }: { id: string; label: string; head: string[]; rows: React.ReactNode[][]; small?: boolean }) {
  return (
    <table className={`sf-int-table${small ? " sf-int-sm" : ""}`} role="table" aria-label={label} id={id}>
      <thead role="rowgroup">
        <tr role="row">{head.map((h) => <th key={h} scope="col" role="columnheader">{h}</th>)}</tr>
      </thead>
      <tbody role="rowgroup">
        {rows.map((r, i) => (
          <tr key={i} role="row">
            <th scope="row" role="rowheader">{r[0]}</th>
            {r.slice(1).map((c, j) => (
              <td key={j} role="cell" data-label={head[j + 1]} >{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
