import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Layers,
  Library,
  Mail,
  User,
} from "lucide-react";

import BorrowButton from "@/components/BorrowButton";
import { IBook } from "../../../../types/books";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface BookDetailsPageProps {
  params: Promise<{ bookId: string }>;
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
  const { bookId } = await params;

  let book: IBook | null = null;
  let serviceUnavailable = false;

  try {
    // Get JWT token
    const jwtToken = await auth.api.getToken({
      headers: await headers(),
    });

    console.log("JWT Token:", !!jwtToken?.token);

    if (!jwtToken?.token) {
      throw new Error("Authentication token not found");
    }

    // Fetch book details
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken.token}`,
        },
        cache: "no-store",
      },
    );

    const result = await res.json();

    console.log("Book API Response:", result);

    if (res.status === 404) {
      notFound();
    }

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch book");
    }

    book = result as IBook;
  } catch (error) {
    // Next.js notFound() throws internally, so don't swallow it
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_HTTP_ERROR_FALLBACK;404")
    ) {
      throw error;
    }

    console.error("Book Details Error:", error);
    serviceUnavailable = true;
  }

  // Backend error
  if (serviceUnavailable) {
    return (
      <div className="mx-auto w-full max-w-xl py-16 sm:py-24">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl">
          <BookOpen size={30} className="mx-auto text-red-500" />

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Couldn't load this book
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Please try again in a moment.
          </p>

          <Link
            href="/all-books"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white"
          >
            <ArrowLeft size={18} />
            Back to All Books
          </Link>
        </div>
      </div>
    );
  }

  if (!book) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex items-center gap-2 overflow-hidden text-sm text-gray-500"
      >
        <Link href="/" className="shrink-0 hover:text-blue-600">
          Home
        </Link>

        <span>/</span>

        <Link href="/all-books" className="shrink-0 hover:text-blue-600">
          All Books
        </Link>

        <span>/</span>

        <span className="truncate font-medium text-gray-900">{book.title}</span>
      </nav>

      <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Book Cover */}
          <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 sm:aspect-[16/10] lg:col-span-5 lg:aspect-auto">
            <Image
              src={book.image}
              alt={`${book.title} cover`}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent" />

            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
              {book.category}
            </span>

            <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-slate-900/75 px-3 py-1.5 text-xs font-medium text-white">
              <Library size={13} />
              {book.totalCopies} Copies
            </span>
          </div>

          {/* Book Details */}
          <div className="flex flex-col p-6 sm:p-8 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                <Layers size={14} />
                {book.category}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <Library size={14} />
                {book.totalCopies} in stock
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              {book.title}
            </h1>

            <p className="mt-3 flex flex-wrap items-center gap-2 text-gray-500">
              <User size={16} />
              Written by
              <span className="font-semibold text-gray-800">{book.author}</span>
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-100 bg-slate-50/70 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Library size={19} />
                </div>

                <p className="mt-3 text-2xl font-bold text-gray-900">
                  {book.totalCopies}
                </p>

                <p className="text-xs font-medium text-gray-500">
                  Total Copies
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-slate-50/70 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <Layers size={19} />
                </div>

                <p className="mt-3 truncate text-xl font-bold text-gray-900 sm:text-2xl">
                  {book.category}
                </p>

                <p className="text-xs font-medium text-gray-500">Category</p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                <FileText size={15} />
                About this book
              </h2>

              <p className="mt-2.5 text-sm leading-7 text-gray-600 sm:text-base">
                {book.description ||
                  "No description has been added for this book yet."}
              </p>
            </div>

            {/* Added By */}
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <User size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-400">Added by</p>

                <p className="truncate text-sm font-semibold text-gray-800">
                  {book.userName}
                </p>
              </div>

              <span className="hidden h-8 w-px bg-gray-100 sm:block" />

              <div className="flex min-w-0 items-center gap-1.5 text-sm text-gray-500">
                <Mail size={15} />
                <span className="truncate">{book.userEmail}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:gap-4">
              <BorrowButton book={book} />

              <Link
                href="/all-books"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:w-auto"
              >
                <ArrowLeft size={18} />
                Back to All Books
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BookDetailsPage;
