/** Technologies as one line of data. */
export function Tags({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`tags ${className}`.trim()}>
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}
