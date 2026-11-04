"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCalendarAlt, FaUndo } from "react-icons/fa";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface IBorrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  author: string;
  image: string;
  category: string;
  status: "borrowed" | "returned";
  borrowedAt: string;
}

interface BorrowCardProps {
  borrow: IBorrow;
  onReturned: (id: string) => void;
}

const BorrowCard = ({ borrow, onReturned }: BorrowCardProps) => {
  const [loading, setLoading] = useState(false);

  const handleReturn = async () => {
    try {
      setLoading(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error("Authentication failed!");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrow._id}/return`,
        {
          // method: "DELETE",
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to return book");
      }

      toast.success(result.message || "Book returned successfully!");

      // Immediately remove the returned book from the UI
      onReturned(borrow._id);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center">
      {/* Book Image */}
      <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-44 sm:w-36">
        <Image
          src={borrow.image}
          alt={borrow.bookTitle}
          fill
          unoptimized
          className="object-contain p-3"
        />
      </div>

      {/* Book Details */}
      <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-3">
          <div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              {borrow.category}
            </span>

            <h2 className="mt-3 text-lg md:text-xl font-bold text-gray-800">
              {borrow.bookTitle}
            </h2>

            <p className="mt-1 text-xs md:text-sm text-gray-500">
              By {borrow.author}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-indigo-500" />
              {new Date(borrow.borrowedAt).toLocaleDateString()}
            </span>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-600">
              {borrow.status}
            </span>
          </div>
        </div>

        {/* Return Button */}
        <div className="shrink-0">
          {borrow.status === "borrowed" && (
            <button
              onClick={handleReturn}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 md:px-6 py-2 md:py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <FaUndo />
              {loading ? "Returning..." : "Return Book"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowCard;
