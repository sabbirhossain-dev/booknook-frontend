"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

import BookCard from "@/components/BookCard";
import { IBook } from "../../../types/books";

const AllBooksContent = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const url = category
          ? `${process.env.NEXT_PUBLIC_API_URL}/books?category=${encodeURIComponent(category)}`
          : `${process.env.NEXT_PUBLIC_API_URL}/books`;
        // console.log("Books API URL:", url);

        const res = await fetch(url, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data: IBook[] = await res.json();

        setBooks(data);
      } catch (error) {
        console.error(error);
        setError("Something went wrong while loading books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-blue-600">
              Home
            </Link>

            <span>/</span>

            <span className="text-gray-800">
              <Link
                href="/all-books"
                className="transition hover:text-blue-600"
              >
                All Books
              </Link>
            </span>

            {category && (
              <>
                <span>/</span>
                <span className="font-medium text-blue-600">{category}</span>
              </>
            )}
          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Discover Your Next Read
              </p>

              <h1 className="text-[26px] font-bold text-gray-900 sm:text-4xl">
                {category ? `${category} Books` : "All Books"}
              </h1>

              <p className="mt-2 text-gray-500">
                {category
                  ? `Explore our collection of ${category} books.`
                  : "Explore our complete book collection."}
              </p>
            </div>

            {category && (
              <Link
                href="/all-books"
                className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:text-blue-600"
              >
                <ArrowLeft size={17} />
                View All Books
              </Link>
            )}
          </div>
        </div>

        {/* Book Count */}
        {!loading && !error && (
          <p className="mb-5 text-sm text-gray-500">
            {books.length} {books.length === 1 ? "book" : "books"} found
          </p>
        )}

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
              >
                <div className="h-64 animate-pulse bg-gray-200" />

                <div className="space-y-3 p-4">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="h-10 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error */
          <div className="rounded-2xl bg-white py-16 text-center">
            <p className="text-red-500">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : books.length > 0 ? (
          /* Books */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-16 text-center">
            <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />

            <h2 className="text-xl font-bold text-gray-800">No Books Found</h2>

            <p className="mt-2 text-sm text-gray-500">
              {category
                ? `No books are available in the ${category} category yet.`
                : "There are no books available right now."}
            </p>

            {category && (
              <Link
                href="/all-books"
                className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Explore All Books
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const AllBooksPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 py-20 text-center text-gray-500">
          Loading books...
        </div>
      }
    >
      <AllBooksContent />
    </Suspense>
  );
};

export default AllBooksPage;
