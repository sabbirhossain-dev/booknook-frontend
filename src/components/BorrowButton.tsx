"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, User, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { authClient } from "@/lib/auth-client";
import { IBook } from "../../types/books";
import toast from "react-hot-toast";

interface BorrowButtonProps {
  book: IBook;
}

const BorrowButton = ({ book }: BorrowButtonProps) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleBorrow = async () => {
    if (!user) {
      setError("Please login first to borrow a book.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const borrowData = {
        bookId: book._id,
        userName: user.name,
        userEmail: user.email.trim().toLowerCase(),
      };

      const res = await fetch("http://localhost:5000/borrows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Borrow failed");
      }
      if (res.ok) {
        toast.success("Added Successfully!");
      }

      setSuccess(true);

      // Refresh book stock and other server component data.
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to borrow this book. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button className="h-12 w-full rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-md shadow-blue-100 hover:bg-blue-700 sm:w-auto">
            Borrow Book
          </Button>
        }
      />

      <PopoverContent
        align="center"
        className="w-80 rounded-xl border border-gray-100 p-5 shadow-xl"
      >
        <h3 className="mb-4 flex flex-col gap-1 text-lg font-bold text-gray-900">
          Borrow This Book
          <span className="text-sm font-normal text-gray-500">
            {book.title}
          </span>
        </h3>

        <div className="space-y-3">
          <div className="relative">
            <User
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              value={user?.name || ""}
              readOnly
              placeholder="Your Name"
              className="h-11 rounded-lg pl-9"
            />
          </div>

          <div className="relative">
            <Mail
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              type="email"
              value={user?.email || ""}
              readOnly
              placeholder="Your Email"
              className="h-11 rounded-lg pl-9"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-2 text-xs text-red-600">
              {error}
            </p>
          )}

          <Button
            onClick={handleBorrow}
            disabled={loading || success || !user}
            className={`h-11 w-full rounded-lg font-semibold ${
              success
                ? "bg-emerald-600 hover:bg-emerald-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {success && toast.success("successfully added!")}
            {loading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Borrowing...
              </>
            ) : success ? (
              <>
                <CheckCircle2 size={16} className="mr-2" />
                Borrowed Successfully
              </>
            ) : (
              "Confirm Borrow"
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BorrowButton;
