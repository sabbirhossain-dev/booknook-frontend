import ExploreCategories from "@/components/ExploreCategories";
import Banner from "@/components/home/Banner";
import HowBorrowingWorks from "@/components/HowBorrowingWorks";
import NewArrivals from "@/components/NewArrivals";
import ReaderReviews from "@/components/ReadersReview";

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
