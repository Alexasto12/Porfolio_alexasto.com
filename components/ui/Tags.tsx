type TagsProps = {
  items: string[];
};

/** Row of monospace tag pills. */
export function Tags({ items }: TagsProps) {
  return (
    <div className="tags">
      {items.map((it, i) => (
        <span key={i} className="tag">
          {it}
        </span>
      ))}
    </div>
  );
}
