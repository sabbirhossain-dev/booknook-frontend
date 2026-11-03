import ExploreCategories from "@/components/home/ExploreCategories";
import Banner from "@/components/home/Banner";
import HowBorrowingWorks from "@/components/home/HowBorrowingWorks";
import NewArrivals from "@/components/home/NewArrivals";
import ReaderReviews from "@/components/home/ReadersReview";

export default function Home() {
  return (
    <div>
      <Banner />
      <NewArrivals />
      <ExploreCategories />
      <HowBorrowingWorks />
      <ReaderReviews />
    </div>
  );
}
