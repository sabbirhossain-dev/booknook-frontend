"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCalendarAlt, FaUndo } from "react-icons/fa";
import toast from "react-hot-toast";

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

const BorrowCard = ({ borrow }: { borrow: IBorrow }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReturn = async () => {
    // const confirmReturn = window.confirm(
    //   "Are you sure you want to return this book?",
    // );

    // if (!confirmReturn) return;

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/borrows/${borrow._id}/return`,
        { method: "PATCH" },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to return book");
      }

      toast.success(data.message || "Book returned successfully!");

      // Refresh server component data.
      router.refresh();
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

            <h2 className="mt-3 text-xl font-bold text-gray-800">
              {borrow.bookTitle}
            </h2>

            <p className="mt-1 text-sm text-gray-500">By {borrow.author}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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
