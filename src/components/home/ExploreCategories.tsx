import {
  BookOpen,
  Heart,
  FlaskConical,
  Landmark,
  Code,
  Baby,
  Palette,
  Globe,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Fiction",
    description: "Stories that inspire imagination",
    icon: BookOpen,
    books: "Stories & Novels",
    color: "bg-blue-50 text-blue-600",
  },
  {
    name: "Science",
    description: "Discover the world of science",
    icon: FlaskConical,
    books: "Science & Research",
    color: "bg-purple-50 text-purple-600",
  },
  {
    name: "History",
    description: "Explore the past and its stories",
    icon: Landmark,
    books: "History & Culture",
    color: "bg-amber-50 text-amber-600",
  },
  {
    name: "Technology",
    description: "Learn about modern technology",
    icon: Code,
    books: "Programming & IT",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "Romance",
    description: "Stories full of love and emotion",
    icon: Heart,
    books: "Romance & Drama",
    color: "bg-pink-50 text-pink-600",
  },
  {
    name: "Children",
    description: "Fun and educational reading",
    icon: Baby,
    books: "Kids & Education",
    color: "bg-orange-50 text-orange-600",
  },
  {
    name: "Arts",
    description: "Creativity, design and inspiration",
    icon: Palette,
    books: "Art & Creativity",
    color: "bg-rose-50 text-rose-600",
  },
  {
    name: "Geography",
    description: "Discover places around the world",
    icon: Globe,
    books: "Travel & Geography",
    color: "bg-cyan-50 text-cyan-600",
  },
];

const ExploreCategories = () => {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className=" px-0 md:px-4">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Find Your Interest
            </span>

            <h2 className="mt-2 md:mt-3 text-[26px] font-bold text-gray-900 sm:text-4xl">
              Explore Categories
            </h2>

            <p className="mt-2 md:mt-3 max-w-xl text-sm leading-5 md:leading-7 text-gray-500 sm:text-base">
              From fiction to technology, discover books that match your
              interests and expand your knowledge.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/all-books?category=${encodeURIComponent(category.name)}`}
                className="group block rounded-2xl border border-gray-100 bg-white p-3 md:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-100/50"
              >
                <div
                  className={`mb-5 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl ${category.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={24} />
                </div>

                <h3 className="text-md sm:text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                  {category.name}
                </h3>

                <p className="mt-2 text-xs md:text-sm leading-5 md:leading-6 text-gray-500">
                  {category.description}
                </p>

                <div className="mt-3 md:mt-5 border-t border-gray-100 pt-4">
                  <span className="text-xs font-semibold text-blue-600">
                    {category.books}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreCategories;
