import React from "react";

const BookDetailsPage = async ({ params }: { params: { bookId: string } }) => {
  const { bookId } = await params;

  return (
    <div>
      BookDetailsPage
      <p>{bookId}</p>
    </div>
  );
};

export default BookDetailsPage;
