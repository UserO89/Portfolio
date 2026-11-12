export function SectionHeading({
  number,
  label,
  title,
  id,
  children,
}: {
  number: string;
  label: string;
  title: string;
  id?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <div className="section-meta">
        <span className="section-number">{number}</span>
        <span>{label}</span>
      </div>
      <div>
        <h2 id={id}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
