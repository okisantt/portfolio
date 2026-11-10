const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

/** Opening of every inner page: small label, large title that rises into place, one-line summary. */
export default function PageHead({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="np-head">
      <p className="np-eyebrow rise">{eyebrow}</p>
      <h1 className="np-h1">
        {title.split(" ").map((word, index) => (
          <span key={`${word}-${index}`} className="rise-mask">
            <span className="rise" style={delay(0.08 + index * 0.09)}>
              {word}
            </span>
          </span>
        ))}
      </h1>
      <p className="np-intro rise" style={delay(0.3)}>
        {intro}
      </p>
      {children && (
        <div className="rise" style={delay(0.4)}>
          {children}
        </div>
      )}
    </header>
  );
}
