import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Alex Morgan",
    role: "Book Lover",
    review:
      "BookNook makes discovering and borrowing books so simple. I love how easy it is to explore different categories and find my next read.",
    rating: 5,
    initials: "AM",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Sarah Wilson",
    role: "Regular Reader",
    review:
      "A clean and user-friendly library platform. Managing borrowed books is convenient, and I can easily keep track of my reading journey.",
    rating: 5,
    initials: "SW",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Daniel Smith",
    role: "Student",
    review:
      "As a student, having access to different books in one place is really helpful. The borrowing process is straightforward and enjoyable.",
    rating: 5,
    initials: "DS",
    color: "bg-emerald-100 text-emerald-600",
  },
];

const ReaderReviews = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 ">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Community Feedback
          </span>

          <h2 className="mt-2 md:mt-3 text-[26px] font-bold text-gray-900 sm:text-4xl">
            What Our Readers Say
          </h2>

          <p className="mt-2 md:mt-4 text-sm leading-5 md:leading-7 text-gray-500 sm:text-base">
            Every book creates a new experience. Here is what readers think
            about their BookNook journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="relative rounded-2xl border border-gray-100 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-blue-100/50 sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star
                      key={index}
                      size={17}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <Quote size={30} className="text-blue-100" />
              </div>

              <p className="min-h-28 text-sm leading-7 text-gray-600">
                {review.review}
              </p>

              <div className="mt-7 flex items-center gap-3 border-t border-gray-200 pt-5">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${review.color}`}
                >
                  {review.initials}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    {review.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReaderReviews;
