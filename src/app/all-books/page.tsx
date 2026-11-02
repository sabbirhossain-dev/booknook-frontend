import BookCard from "@/components/BookCard";
import React from "react";
import { IBook } from "../../../types/books";

const AllBooks = async () => {
  const res = await fetch("http://localhost:5000/books");
  const books = await res.json();

  console.log("Fetched books:", books);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
      {books.map((book: IBook) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default AllBooks;
