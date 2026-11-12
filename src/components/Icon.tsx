export function Icon({
  name = "arrow",
  className = "",
}: {
  name?: "arrow" | "diagonal" | "search" | "plus" | "minus";
  className?: string;
}) {
  return (
    <svg
      className={`icon ${className}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "arrow" && <path d="M4 12h15m-6-6 6 6-6 6" />}
      {name === "diagonal" && <path d="M6 18 18 6M6 6h12v12" />}
      {name === "search" && (
        <>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 5 5" />
        </>
      )}
      {name === "plus" && <path d="M5 12h14M12 5v14" />}
      {name === "minus" && <path d="M5 12h14" />}
    </svg>
  );
}
