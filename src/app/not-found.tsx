import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  House,
  Search,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
};

const quickLinks = [
  { name: "Home", href: "/", icon: House },
  { name: "All Books", href: "/all-books", icon: BookOpen },
  { name: "Add Book", href: "/add-book", icon: Bookmark },
];

const NotFound = () => {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-0 md:px-4 py-10 sm:py-16">
      {/* Decorative Background Blobs */}
      <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl" />

      {/* Floating Book Icons */}
      <BookOpen
        size={40}
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-[18%] hidden text-blue-200 sm:block"
      />
      <Bookmark
        size={30}
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] top-[24%] hidden text-blue-300 sm:block"
      />
      <Sparkles
        size={26}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[22%] left-[14%] hidden text-sky-300 sm:block"
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Card */}
        <div className="rounded-3xl border border-slate-100 bg-white px-5 py-8 text-center shadow-xl shadow-slate-200/60 sm:px-12 sm:py-14">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold tracking-widest text-blue-600 shadow-sm">
            <Search size={14} />
            ERROR 404
          </div>

          {/* Big 404 */}
          <div
            aria-hidden="true"
            className="mt-5 md:mt-7 flex items-center justify-center gap-3 sm:gap-5"
          >
            <span className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-8xl">
              4
            </span>

            <span className="flex h-10 w-10 -rotate-6 items-center justify-center rounded-md md:rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200 sm:h-16 sm:w-16 md:w-20 md:h-20">
              <BookOpen size={36} />
            </span>

            <span className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-8xl">
              4
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            This page is lost between the lines
          </h1>

          <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-slate-600 sm:text-base sm:leading-7">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Don&apos;t worry — the story continues elsewhere.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 md:px-5 py-2 md:py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-blue-300"
            >
              <ArrowLeft
                size={17}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to Home
            </Link>

            <Link
              href="/all-books"
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 md:px-5 py-2 md:py-3 text-sm font-bold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              Browse Books
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-3">
          {quickLinks.map((link) => {
            const LinkIcon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                className="group flex items-center justify-center gap-2 text-xs rounded-xl border border-slate-200 bg-white/70 px-2 md:px-4 py-2 pt-2.5 md:py-3 sm:text-sm md:text-md font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <LinkIcon
                  size={16}
                  className="text-blue-600 transition-transform group-hover:-translate-y-0.5"
                />
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default NotFound;
