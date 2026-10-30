import { cn } from "./cn";

export default function Card({ title, className, children }) {
  return (
    <div
      className={cn(
        "bg-white/90 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-5 shadow-card backdrop-blur",
        className
      )}
    >
      {title && <div className="font-semibold mb-3">{title}</div>}
      {children}
    </div>
  );
}
