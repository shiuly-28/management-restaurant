import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const reviewsData = [
  {
    id: 1,
    name: "Rina Hasan",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "Absolutely wonderful experience! The food was delicious, the ambiance was relaxing, and the staff were very professional. I’ll definitely recommend this place to my friends and family!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sajib Khan",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Customer service was very responsive. They handled my queries quickly and politely. The delivery was on time and the packaging was excellent.",
    rating: 4,
  },
  {
    id: 3,
    name: "Anika Rahman",
    image: "https://i.pravatar.cc/150?img=45",
    review:
      "I loved the variety of dishes available! The presentation of the food was beautiful, and it tasted even better. Highly satisfied!",
    rating: 5,
  },
  {
    id: 4,
    name: "Tariq Islam",
    image: "https://i.pravatar.cc/150?img=21",
    review:
      "The restaurant has a cozy vibe with top-notch service. The staff was polite, and the overall experience was beyond expectations. Would definitely visit again!",
    rating: 5,
  },

];

function Reviews() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-12 px-6 my-10 rounded-lg ">
      <h2
        data-aos="fade-up"
        className="text-3xl font-bold mb-10 text-center text-green-600"
      >
        What Our Customers Say
      </h2>

      {/* Grid - 4 cards per row */}
      <div className="grid gap-8 grid-cols-1  lg:grid-cols-4">
        {reviewsData.map(({ id, name, image, review, rating }) => (
          <div
            key={id}
            data-aos="zoom-in"
            className=" p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col border border-transparent hover:border-green-500"
          >
            <div className="flex items-center gap-4 mb-4 ">
              <img
                src={image}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border-2 border-green-500"
              />
              <div>
                <h3 className="font-semibold text-lg">{name}</h3>
                <div>
                  {[...Array(rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <span key={i} className=" text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Review text */}
            <p className=" italic leading-relaxed flex-grow">
              “{review}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
