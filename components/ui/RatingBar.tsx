type RatingBarProps = {
  value: number;
  max?: number;
};

/** Ten-square rating bar (filled up to `value`). */
export function RatingBar({ value, max = 10 }: RatingBarProps) {
  return (
    <div className="rate">
      {Array.from({ length: max }).map((_, i) => (
        <i key={i} data-on={i < value} />
      ))}
    </div>
  );
}
