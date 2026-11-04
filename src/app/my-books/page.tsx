"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  FaBookOpen,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaUser,
  FaLayerGroup,
} from "react-icons/fa";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

interface IBook {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  image: string;
  totalCopies: number;
  userName: string;
  userEmail: string;
}

const MyBooksPage = () => {
  const { data: session, isPending } = authClient.useSession();

  const [myBooks, setMyBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<IBook | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const userEmail = session?.user?.email;

  // Fetch user's books
  useEffect(() => {
    if (isPending) return;

    if (!userEmail) {
      setMyBooks([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchMyBooks = async () => {
      try {
        setLoading(true);

        // Get JWT token
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Authentication failed! Please login again.");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-book?email=${encodeURIComponent(userEmail)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
            cache: "no-store",
          },
        );

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Failed to fetch your books");
        }

        if (isMounted) {
          setMyBooks(result);
        }
      } catch (error) {
        console.error("My Books Error:", error);

        if (isMounted) {
          setMyBooks([]);
          toast.error(
            error instanceof Error
              ? error.message
              : "Could not load your books",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMyBooks();

    return () => {
      isMounted = false;
    };
  }, [userEmail, isPending]);

  // Update book
  const handleUpdate = async () => {
    if (!editingBook || !userEmail) return;

    try {
      setSaving(true);

      // Get JWT token
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication failed! Please login again.");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${editingBook._id}`,
        {
          method: "PATCH",
          // method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify({
            ...editingBook,
            userEmail,
          }),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update book");
      }

      // Update local state
      setMyBooks((previousBooks) =>
        previousBooks.map((book) =>
          book._id === editingBook._id ? editingBook : book,
        ),
      );

      setEditingBook(null);

      toast.success("Book updated successfully!");
    } catch (error) {
      console.error("Update Error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete book
  const handleDelete = async (bookId: string) => {
    if (!userEmail) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this book?",
    );

    if (!confirmed) return;

    try {
      setDeletingId(bookId);

      // Get JWT token
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication failed! Please login again.");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}?email=${encodeURIComponent(userEmail)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to delete book");
      }

      // Remove book from local state
      setMyBooks((previousBooks) =>
        previousBooks.filter((book) => book._id !== bookId),
      );

      toast.success("Book deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Loading
  if (isPending || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <LoadingSpinner label="Loading your books..." />
      </div>
    );
  }

  // Not logged in
  if (!userEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="font-medium text-slate-500">Please login first!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-2 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[3px] text-indigo-600">
              Your Collection
            </p>

            <h1 className="text-[26px] font-extrabold text-slate-800 sm:text-4xl">
              My Books
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage and organize the books you have added.
            </p>
          </div>

          {/* Total Books */}
          <div className="flex w-fit items-center gap-4 rounded-2xl border border-slate-200 bg-white px-3 md:px-5 py-2 md:py-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <FaBookOpen size={21} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">Total Books</p>

              <p className="text-lg md:text-2xl text-center font-bold text-slate-800">
                {myBooks.length}
              </p>
            </div>
          </div>
        </div>

        {/* Book List */}
        <div className="space-y-5">
          {myBooks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
              <FaBookOpen className="mx-auto mb-4 text-4xl text-slate-300" />

              <h2 className="text-xl font-bold text-slate-700">
                No Books Found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                You haven't added any books yet.
              </p>
            </div>
          ) : (
            myBooks.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-5 p-4 sm:p-5 md:flex-row md:items-center">
                  {/* Book Image */}
                  <div className="h-52 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-56 md:h-44 md:w-36">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                        {book.category}
                      </span>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        {book.totalCopies} Copies
                      </span>
                    </div>

                    <h2 className="text-lg md:text-xl font-bold text-slate-800 sm:text-2xl">
                      {book.title}
                    </h2>

                    <p className="mt-2 flex items-center gap-2 text-xs md:text-sm text-slate-500">
                      <FaUser className="text-indigo-500" />
                      {book.author}
                    </p>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                      {book.description || "No description available."}
                    </p>

                    {/* <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-400">
                      <FaLayerGroup />
                      <span>Book ID: {book._id}</span>
                    </div> */}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex shrink-0 gap-3 border-t border-slate-100 pt-4 md:w-32 md:flex-col md:border-l md:border-t-0 md:pl-5 md:pt-0">
                    <button
                      onClick={() => setEditingBook({ ...book })}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 md:px-4 py-2 md:py-3 text-sm font-semibold cursor-pointer text-white transition hover:bg-indigo-700 md:w-full"
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(book._id)}
                      disabled={deletingId === book._id}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 cursor-pointer px-3 md:px-4 py-2 md:py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 md:w-full"
                    >
                      <FaTrash />
                      {deletingId === book._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Edit Book</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update your book information.
                </p>
              </div>

              <button
                onClick={() => setEditingBook(null)}
                className="rounded-lg bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
                aria-label="Close edit form"
              >
                <FaTimes />
              </button>
            </div>

            {/* Edit Form */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleUpdate();
              }}
              className="space-y-4"
            >
              {/* Book Title */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Book Title
                </label>

                <input
                  required
                  value={editingBook.title}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Author */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Author
                </label>

                <input
                  required
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      author: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Category
                </label>

                <input
                  required
                  value={editingBook.category}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Image URL
                </label>

                <input
                  type="url"
                  value={editingBook.image}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      image: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Total Copies */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Total Copies
                </label>

                <input
                  type="number"
                  min="0"
                  required
                  value={editingBook.totalCopies}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      totalCopies: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={editingBook.description || ""}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                >
                  <FaSave />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooksPage;
