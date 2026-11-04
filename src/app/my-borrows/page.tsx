"use client";

import { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa";

import BorrowCard from "@/components/BorrowCard";
import { authClient } from "@/lib/auth-client";
import LoadingSpinner from "@/components/LoadingSpinner";

interface IBorrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  author: string;
  image: string;
  category: string;
  userName: string;
  userEmail: string;
  status: "borrowed" | "returned";
  borrowedAt: string;
  returnedAt?: string;
}

const MyBorrowsPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [activeBorrows, setActiveBorrows] = useState<IBorrow[]>([]);
  const [loading, setLoading] = useState(true);

  const userEmail = session?.user?.email;

  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setActiveBorrows([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchMyBorrows = async () => {
      try {
        setLoading(true);

        const { data: tokenData, error } = await authClient.token();

        if (error || !tokenData?.token) {
          throw new Error("Authentication failed!");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-borrows`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenData.token}`,
            },
            cache: "no-store",
          },
        );

        const responseData = await res.json();

        if (!res.ok) {
          throw new Error(responseData.message || "Failed to fetch borrows");
        }

        if (isMounted) {
          setActiveBorrows(responseData);
        }
      } catch (error) {
        console.error("My Borrows Error:", error);

        if (isMounted) {
          setActiveBorrows([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMyBorrows();

    return () => {
      isMounted = false;
    };
  }, [userEmail, isPending]);

  // Loading
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <LoadingSpinner label="Loading your borrowed books..." />
      </div>
    );
  }

  // Not logged in
  if (!userEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <p className="text-gray-500">Please login first!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-2 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Your Library
            </p>

            <h1 className="text-[26px] font-bold text-gray-800 md:text-4xl">
              My Borrows
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your borrowed books in one place.
            </p>
          </div>

          {/* Active Borrow Count */}
          <div className="flex items-center gap-4 rounded-xl border bg-white px-4 md:px-5 py-3 shadow-sm w-3/5 md:w-auto">
            <FaBookOpen className="text-2xl text-indigo-600" />

            <div>
              <p className="text-sm text-gray-500">Active Borrows</p>

              <p className="text-lg md:text-xl font-bold text-center text-gray-800">
                {activeBorrows.length}
              </p>
            </div>
          </div>
        </div>

        {/* Borrowed Books */}
        <div className="flex flex-col gap-5">
          {activeBorrows.length > 0 ? (
            activeBorrows.map((borrow) => (
              <BorrowCard
                key={borrow._id}
                borrow={borrow}
                onReturned={(id) => {
                  setActiveBorrows((prev) =>
                    prev.filter((item) => item._id !== id),
                  );
                }}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
              <FaBookOpen className="mx-auto mb-4 text-4xl text-slate-300" />

              <h2 className="text-xl font-bold text-slate-700">
                No Books Found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                You haven't borrowed any books yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBorrowsPage;
