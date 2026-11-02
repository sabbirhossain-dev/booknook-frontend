"use client";

import { useState } from "react";
import { BookOpen, CheckCircle2, Loader2 } from "lucide-react";

type BorrowStatus = "idle" | "loading" | "success" | "error";

interface BorrowButtonProps {
  bookId: string;
}

const BorrowButton = ({ bookId }: BorrowButtonProps) => {
  const [status, setStatus] = useState<BorrowStatus>("idle");
  const [error, setError] = useState("");

  const handleBorrow = async () => {
    setStatus("loading");
    setError("");

    try {
      // TODO: update the endpoint/payload once the backend adds the borrow route
      const res = await fetch("http://localhost:5000/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setStatus("success");
    } catch {
      setStatus("error");
      setError("Couldn't borrow this book — the borrow API isn't available yet.");
    }
  };

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto">
      <button
        type="button"
        onClick={handleBorrow}
        disabled={status === "loading" || status === "success"}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-lg transition duration-200 sm:w-auto ${
          status === "success"
            ? "cursor-default bg-emerald-600 text-white shadow-emerald-200"
            : "bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 disabled:cursor-not-allowed disabled:opacity-70"
        }`}
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Borrowing...
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle2 size={18} />
            Borrowed
          </>
        ) : (
          <>
            <BookOpen size={18} />
            Borrow Book
          </>
        )}
      </button>

      {status === "error" && (
        <p
          role="alert"
          className="text-center text-sm font-medium text-red-600 sm:text-left"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default BorrowButton;
