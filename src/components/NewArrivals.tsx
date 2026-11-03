"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IBook } from "../../types/books";
import { BookOpen, User, ArrowUpRight, Library } from "lucide-react";

const NewArrivals = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/new-arrivals`,
          {
            cache: "no-store",
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch latest books");
        }

        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("New Arrivals Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Discover New Books
            </p>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              New Arrivals
            </h2>

            <p className="mt-2 text-gray-500">
              Explore the latest books added to our library.
            </p>
          </div>

          <Link
            href="/all-books"
            className="flex w-fit items-center gap-2 font-semibold text-blue-600 transition hover:gap-3 hover:text-blue-700"
          >
            See All Books
            <ArrowUpRight size={19} />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
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
        ) : books.length > 0 ? (
          /* Books Grid */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.slice(0, 6).map((book) => (
              <div
                key={book._id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/60"
              >
                {/* Book Image */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  {book.image?.trim() ? (
                    <Image
                      src={book.image}
                      alt={book.title || "Book cover"}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center text-gray-400">
                        <BookOpen size={40} className="mx-auto mb-2" />
                        <p className="text-sm">No Image Available</p>
                      </div>
                    </div>
                  )}

                  {/* Category Badge */}
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur">
                    {book.category}
                  </span>

                  {/* Copies Badge */}
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-slate-900/75 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    <Library size={13} />
                    {book.totalCopies} Copies
                  </span>
                </div>

                {/* Book Information */}
                <div className="flex flex-1 flex-col p-3">
                  {/* Title & Author */}
                  <div className="mb-3">
                    <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                      {book.title}
                    </h3>

                    <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                      <User size={14} />
                      By {book.author}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mb-5 line-clamp-2 min-h-10 text-sm leading-relaxed text-gray-500">
                    {book.description}
                  </p>

                  {/* Added By */}
                  <div className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <User size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-gray-400">Added by</p>
                      <p className="truncate text-sm font-semibold text-gray-700">
                        {book.userName}
                      </p>
                    </div>

                    {/* Details Button */}
                    <Link
                      href={`/all-books/${book._id}`}
                      className="flex h-10 w-auto shrink-0 items-center justify-center gap-1 rounded-xl bg-blue-600 px-2 text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200"
                      aria-label={`View ${book.title} details`}
                    >
                      <span className="text-sm">View Details</span>
                      <ArrowUpRight size={19} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <BookOpen size={45} className="mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-700">
              No Books Available
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              New books will appear here when they are added.
            </p>
          </div>
        )}

        {/* See All Books Button */}
        {!loading && books.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              href="/all-books"
              className="inline-flex items-center text-sm gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md shadow-blue-100 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
            >
              See All Books
              <ArrowUpRight size={19} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
