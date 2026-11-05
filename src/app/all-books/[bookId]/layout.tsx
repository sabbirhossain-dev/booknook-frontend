import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books Details",
};

export default function AllBooksLayout({
  children,
}: LayoutProps<"/all-books">) {
  return <>{children}</>;
}
