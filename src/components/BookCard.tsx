import Image from "next/image";
import Link from "next/link";
import { IBook } from "../../types/books";
import { BookOpen, User, ArrowUpRight, Library } from "lucide-react";

interface BookCardProps {
  book: IBook;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/60">
      {/* Book Image */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <div className="relative h-64 overflow-hidden bg-slate-100">
          {book.image?.trim() ? (
            <Image
              src={book.image}
              alt={book.title || "Book cover"}
              fill
              sizes="(max-width: 640px) 100vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-gray-400">
                <BookOpen size={40} className="mx-auto mb-2" />
                <p className="text-sm">No Image Available</p>
              </div>
            </div>
          )}
        </div>

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
          <h2 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
            {book.title}
          </h2>

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
            className="flex h-9 px-3 w-auto shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200"
            aria-label={`View ${book.title} details`}
          >
            <span className="text-sm">View Details</span>
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
