import { Search, BookOpen, RotateCcw, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Find Your Book",
    description:
      "Explore our collection and find the book you want to read. Search by title, author, or category.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Borrow a Book",
    description:
      "Choose your favorite book and request to borrow it. Your borrowed books will appear in your account.",
  },
  {
    number: "03",
    icon: RotateCcw,
    title: "Enjoy & Return",
    description:
      "Enjoy your reading journey and return the book when you are finished so others can read it too.",
  },
];

const HowBorrowingWorks = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 text-start">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Simple & Easy
          </span>

          <h2 className="mt-2 md:mt-3 text-[26px] font-bold text-gray-900 sm:text-4xl">
            How Borrowing Works
          </h2>

          <p className="mt-2 md:mt-4 text-sm leading-5 md:leading-7 text-gray-500 sm:text-base">
            Getting your favorite book is easier than ever. Follow these three
            simple steps and start reading today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-gray-100 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:bg-white hover:shadow-xl hover:shadow-blue-100/50"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={25} />
                  </div>

                  <span className="text-3xl font-extrabold text-gray-200">
                    {step.number}
                  </span>
                </div>

                <h3 className="mb-2 md:mb-3 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="text-sm leading-5 md:leading-7 text-gray-500">
                  {step.description}
                </p>

                {index !== 2 && (
                  <div className="mt-4 md:mt-6 hidden items-center gap-2 text-sm font-semibold text-blue-600 md:flex">
                    Step {index + 1}
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowBorrowingWorks;
