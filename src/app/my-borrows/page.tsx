import { FaBookOpen } from "react-icons/fa";
import BorrowCard from "@/components/BorrowCard";

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

const MyBorrowsPage = async () => {
  let activeBorrows: IBorrow[] = [];

  try {
    const res = await fetch("http://localhost:5000/borrows", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch borrows");
    }

    const borrows: IBorrow[] = await res.json();

    // Only show currently borrowed books
    activeBorrows = borrows.filter((borrow) => borrow.status === "borrowed");
  } catch (error) {
    console.error("My Borrows Error:", error);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Your Library
            </p>

            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              My Borrows
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your borrowed books in one place.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border bg-white px-5 py-3 shadow-sm">
            <FaBookOpen className="text-2xl text-indigo-600" />

            <div>
              <p className="text-sm text-gray-500">Active Borrows</p>
              <p className="text-xl font-bold text-gray-800">
                {activeBorrows.length}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {activeBorrows.length > 0 ? (
            activeBorrows.map((borrow) => (
              <BorrowCard key={borrow._id} borrow={borrow} />
            ))
          ) : (
            <p className="py-10 text-center text-gray-500">
              You have no borrowed books!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBorrowsPage;
