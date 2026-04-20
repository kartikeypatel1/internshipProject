import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";

function Freebook() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        setBook(res.data.filter((item) => item.category === "Free"));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className="py-20 bg-gray-50/50 dark:bg-slate-900/50">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="section-badge mb-3">✨ &nbsp;No Cost, No Signup</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              Free Offered{" "}
              <span className="gradient-text">Books</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg text-sm md:text-base">
              Hand-picked classic and modern titles — completely free. Start
              your reading journey without spending a cent.
            </p>
          </div>
          <a
            href="/course"
            className="shrink-0 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            View all books →
          </a>
        </div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
                <div className="h-56 skeleton-shimmer" />
                <div className="p-4 space-y-2">
                  <div className="h-4 rounded skeleton-shimmer w-3/4" />
                  <div className="h-3 rounded skeleton-shimmer w-1/2" />
                  <div className="h-3 rounded skeleton-shimmer w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : book.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">📚</div>
            <p className="text-gray-400 text-lg">No free books found.</p>
            <p className="text-gray-400 text-sm mt-1">Make sure the backend is running and seeded.</p>
          </div>
        ) : (
          <Slider {...settings}>
            {book.map((item) => (
              <Cards item={item} key={item._id} />
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}

export default Freebook;
