import React, { useContext, useEffect } from 'react';
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from '../context/AuthContext';

const PopularCategories = () => {
  const { darkMode } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const categories = [
    { name: "Biryani", image: "https://i.ibb.co/xvWsRZ6/plate-biryani-with-bunch-food-it-505751-3819.jpg" },
    { name: "Pizza", image: "https://i.ibb.co/twWQw5mM/mixed-pizza-with-various-ingridients-140725-3790.jpg" },
    { name: "Burger", image: "https://i.ibb.co/mrxPhpWS/front-view-tasty-meat-burger-with-cheese-salad-dark-background-140725-89597.jpg" },
    { name: "Drinks", image: "https://i.ibb.co/6GD2Jtp/fresh-orange-drinks-with-sliced-lime-mint-ice-cubes-white-flowers-23-2148145375.jpg" },
    { name: "Dessert", image: "https://i.postimg.cc/J7XWTPSV/pexels-donaldtong94-2205270.jpg" },
    { name: "Salad", image: "https://i.postimg.cc/sXqsMLqF/bowl-salad-with-cherry-tomatoes-cherry-tomato-483785-2512.avif" },
  ];

  return (
    <div className="py-14">
      <h2 className={`${darkMode ? "text-gray-300" : "text-black"} text-3xl text-center font-semibold`}>
        <span className="text-green-500 mr-2">
          <Typewriter
            words={['Explore', 'Taste', 'Enjoy']}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={60}
            delaySpeed={1000}
          />
        </span>
        Popular Categories
      </h2>

      {/* Marquee Section */}
      <div className="overflow-hidden relative mt-10">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" }
          }}
        >
          {/* Duplicate the categories to make seamless scrolling */}
          {[...categories, ...categories].map((c, idx) => (
            <div
              key={idx}
              className="min-w-[200px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-base-100 cursor-pointer"
            >
              <div className="overflow-hidden">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-40 object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="text-center py-3 font-medium text-lg">{c.name}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PopularCategories;
