"use client";

import { useState } from "react";
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
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const isUnavailable = Number(book.totalCopies) <= 0;

  const handleBorrow = async () => {
    try {
      setLoading(true);
      setError("");

      // Get JWT token
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error("Please login first!");
        return;
      }

      const token = data.token;

      // Borrow API request
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: book._id,
          title: book.title,
          author: book.author,
          image: book.image,
          userName: user?.name,
          userEmail: user?.email,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || "Failed to borrow book");
        toast.error(result.message || "Failed to borrow book");
        return;
      }

      setSuccess(true);
      setOpen(false);

      toast.success("Book borrowed successfully!");
    } catch (error) {
      console.error("Borrow Error:", error);

      const message =
        error instanceof Error ? error.message : "Something went wrong!";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            disabled={isUnavailable}
            className={`h-12 w-full rounded-xl font-semibold shadow-md transition sm:w-auto ${
              isUnavailable
                ? "cursor-not-allowed bg-gray-200 px-6 text-gray-500 shadow-none hover:bg-gray-200"
                : "cursor-pointer bg-blue-600 px-6 text-white shadow-blue-100 hover:bg-blue-700"
            }`}
          >
            {isUnavailable ? "Unavailable" : "Borrow Book"}
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
