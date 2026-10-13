type SectionHeadProps = {
  num: string;
  label: string;
  heading?: string;
  description?: string;
  className?: string;
};

/** Section index (number and name, as data), the heading and an optional intro. */
export function SectionHead({ num, label, heading, description, className = "" }: SectionHeadProps) {
  return (
    <div className={`sec-head ${className}`.trim()}>
      <p className="sec-index meta">
        <span className="sec-index__num">{num}</span>
        <span>{label}</span>
      </p>
      {heading && <h2 className="sec-head__title h-section">{heading}</h2>}
      {description && <p className="sec-head__intro copy muted">{description}</p>}
    </div>
  );
}
