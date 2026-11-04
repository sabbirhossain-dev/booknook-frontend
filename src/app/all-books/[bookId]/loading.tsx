import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 py-20">
      <LoadingSpinner label="Loading book details..." />
    </div>
  );
}
