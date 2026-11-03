"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ArrowRight, BookOpen, Sparkles, TrendingUp } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

import bannerImg1 from "../../../public/assets/banner-img1.jpg";
import bannerImg2 from "../../../public/assets/banner-img-2.jpg";
import bannerImg3 from "../../../public/assets/banner-img-3.jpg";
import { useEffect, useState } from "react";

const slides = [
  {
    id: "winter-sale",
    eyebrow: "A WORLD OF STORIES",
    title: "Discover Your Next Favorite Book",
    highlight: "Find Your Next Adventure",
    description:
      "Step into fascinating worlds, uncover timeless stories, and discover books that inspire your imagination.",
    image: bannerImg1,
    badge: "Editor's Choice",
    icon: TrendingUp,
  },
  {
    id: "new-arrivals",
    eyebrow: "FRESH ARRIVALS",
    title: "New Stories. New Adventures.",
    highlight: "Explore the latest collection",
    description:
      "Find your next great read from our newest collection of exciting books and timeless classics.",
    image: bannerImg2,
    badge: "Just Arrived",
    icon: Sparkles,
  },
  {
    id: "share-shelf",
    eyebrow: "COMMUNITY READING",
    title: "Share Books, Spread Knowledge.",
    highlight: "Make reading a community",
    description:
      "Add your favorite books, connect with fellow readers, and share the joy of reading with everyone.",
    image: bannerImg3,
    badge: "Read Together",
    icon: BookOpen,
  },
];

const Banner = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="w-full py-5 sm:py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="min-h-[540px] animate-pulse rounded-2xl bg-slate-100 sm:rounded-3xl md:min-h-[430px] lg:min-h-[490px]" />
        </div>
      </section>
    );
  }
  return (
    <section className="w-full py-4 sm:py-7">
      <div className="">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          loop
          speed={800}
          className="booknook-banner overflow-hidden "
        >
          {slides.map((slide, index) => {
            const BadgeIcon = slide.icon;

            return (
              <SwiperSlide key={slide.id}>
                <div className="grid min-h-[540px] grid-cols-1 overflow-hidden bg-[#f5f8ff] md:min-h-[430px] md:grid-cols-2 lg:min-h-[490px]">
                  {/* Left Content */}
                  <div className="relative flex flex-col justify-center px-4 py-12 sm:px-10 sm:py-14 lg:px-16">
                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-blue-100/50 blur-3xl" />

                    <div className="relative z-10">
                      {/* Eyebrow */}
                      <div className="mb-5 inline-flex w-fit items-center justify-center pt-3 gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold tracking-widest text-blue-600 shadow-sm">
                        <Sparkles size={14} />
                        {slide.eyebrow}
                      </div>

                      {/* Heading */}
                      <h1 className="max-w-xl text-[26px] font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        {slide.title}
                      </h1>

                      {/* Highlight */}
                      <p className="mt-4 text-lg font-bold text-blue-600 sm:text-xl">
                        {slide.highlight}
                      </p>

                      {/* Description */}
                      <p className="mt-4 max-w-lg text-sm leading-6 md:leading-7 text-slate-600 sm:text-base">
                        {slide.description}
                      </p>

                      {/* Buttons */}
                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                          href="/all-books"
                          className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 md:px-6 mdLpy-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-blue-300"
                        >
                          Explore Books
                          <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </Link>

                        <Link
                          href="/all-books"
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 md:px-6 mdLpy-3.5 text-sm font-bold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >
                          Browse Books
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="relative min-h-[280px] md:min-h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />

                    {/* Image Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/10 md:bg-gradient-to-r md:from-[#f5f8ff]/20 md:via-transparent md:to-slate-950/20" />

                    {/* Floating Badge */}
                    {/* <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-auto">
                      <div className="inline-flex items-center gap-3 rounded-2xl border border-white/30 bg-white/90 p-4 shadow-xl backdrop-blur-md">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                          <BadgeIcon size={22} />
                        </div>

                        <div>
                          <p className="text-xs font-medium text-slate-500">
                            Discover more
                          </p>
                          <p className="text-sm font-bold text-slate-900">
                            {slide.badge}
                          </p>
                        </div>
                      </div>
                    </div> */}

                    {/* Decorative Circle */}
                    <div className="absolute right-8 top-8 hidden h-24 w-24 rounded-full border border-white/40 md:block" />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Custom Pagination Styling */}
        <style jsx global>{`
          .booknook-banner .swiper-pagination {
            bottom: 18px !important;
            left: 0;
            width: 50% !important;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
          }

          .booknook-banner .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            border-radius: 20px;
            background: #94a3b8;
            opacity: 0.6;
            transition: all 0.3s ease;
          }

          .booknook-banner .swiper-pagination-bullet-active {
            width: 25px;
            background: #2563eb;
            opacity: 1;
          }

          @media (max-width: 767px) {
            .booknook-banner .swiper-pagination {
              width: 100% !important;
              bottom: 12px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Banner;
