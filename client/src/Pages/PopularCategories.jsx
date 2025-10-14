import React, { useContext } from 'react';
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import { AuthContext } from '../context/AuthContext';

const PopularCategories = () => {
    const { darkMode } = useContext(AuthContext);
    const categories = [
        { name: "Biryani", image: "https://i.ibb.co/xvWsRZ6/plate-biryani-with-bunch-food-it-505751-3819.jpg" },
        { name: "Pizza", image: "https://i.ibb.co/twWQw5mM/mixed-pizza-with-various-ingridients-140725-3790.jpg" },
        { name: "Burger", image: "https://i.ibb.co/mrxPhpWS/front-view-tasty-meat-burger-with-cheese-salad-dark-background-140725-89597.jpg" },
        { name: "Drinks", image: "https://i.ibb.co/6GD2Jtp/fresh-orange-drinks-with-sliced-lime-mint-ice-cubes-white-flowers-23-2148145375.jpg" },
    ];

    return (
        <div className="py-14 ">
            <h2 className={`${darkMode ? "text-gray-300" : "text-black"} text-3xl text-center font-semibold`}>
                <span className="text-primary mr-2">
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

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 mt-5">
                {categories.map((c, idx) => (
                    <motion.div
                        key={idx}
                        className="rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-base-100"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.2 }}
                        viewport={{ once: true }}
                    >
                        <img src={c.image} alt={c.name} className="w-full h-40 object-cover" />
                        <div className="text-center py-3 font-medium text-lg">{c.name}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;
