export function Particles() {
  const positions = [
    "left-1/4 top-1/4",
    "left-1/2 top-3/4",
    "left-3/4 top-1/2",
    "left-1/3 top-2/3",
    "left-2/3 top-1/4",
    "left-1/4 top-3/4",
    "left-3/4 top-1/4",
    "left-1/2 top-1/2",
  ];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden mix-blend-screen"
    >
      {positions.map((position, index) => (
        <span
          key={position}
          className={`absolute rounded-full bg-primary/30 blur-sm motion-safe:animate-float ${index % 2 ? "size-3" : "size-5"} ${position}`}
        />
      ))}
    </div>
  );
}
