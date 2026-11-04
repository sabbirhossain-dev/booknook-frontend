import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  label?: string;
  className?: string;
}

const LoadingSpinner = ({ label, className }: LoadingSpinnerProps) => {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

      {label && (
        <p className="text-sm font-medium text-slate-500">{label}</p>
      )}

      <span className="sr-only">{label ?? "Loading..."}</span>
    </div>
  );
};

export default LoadingSpinner;
