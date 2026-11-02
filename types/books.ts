
export interface IBook {
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

export interface IBorrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  author: string;
  category: string;
  image: string;
  userName: string;
  userEmail: string;
  status: "borrowed" | "returned";
  borrowedAt: string;
  returnedAt?: string;
}
