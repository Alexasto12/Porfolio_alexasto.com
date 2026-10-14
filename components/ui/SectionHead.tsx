type SectionHeadProps = {
  /** id of the heading, for the section's aria-labelledby. */
  id: string;
  heading: string;
  description?: string;
  className?: string;
};

/** A section's heading and its optional intro. On wide screens the intro sits beside the heading. */
export function SectionHead({ id, heading, description, className = "" }: SectionHeadProps) {
  return (
    <div className={`sec-head ${description ? "sec-head--split" : ""} ${className}`.trim()}>
      <h2 id={id} className="sec-head__title h-section">
        {heading}
      </h2>
      {description && <p className="sec-head__intro copy">{description}</p>}
    </div>
  );
}
