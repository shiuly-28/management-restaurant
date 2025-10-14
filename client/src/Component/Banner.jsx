import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import banner1 from '../assets/banner-1.avif';
import banner2 from '../assets/banner-2.jpg';
import banner3 from '../assets/banner-3.avif';

const MotionLink = motion(Link);

const Banner = () => {
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: 'easeOut' },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            transition: { duration: 0.3 },
            boxShadow: '0px 0px 8px rgb(0, 102, 255)',
        },
    };

    const slides = [
        {
            id: 1,
            img: banner1,
            title: 'Your Plate, Our Passion',
            desc: 'Experience the perfect blend of spices, flavors, and love in every bite you take.',
        },
        {
            id: 2,
            img: banner2,
            title: 'A Journey of Flavors Awaits',
            desc: 'Indulge in a variety of cuisines crafted by our expert chefs to satisfy every craving.',
        },
        {
            id: 3,
            img: banner3,
            title: 'Taste the Best, Served Fresh!',
            desc: 'From farm to table — enjoy mouthwatering dishes made with the freshest ingredients, every single day.',
        },
    ];

    return (
        <div className="w-full overflow-hidden">
            <div className="carousel w-full overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        id={`slide${slide.id}`}
                        key={slide.id}
                        className="carousel-item relative w-full overflow-hidden"
                    >
                        <motion.img
                            src={slide.img}
                            alt={`Banner ${slide.id}`}
                            className="w-full h-[85vh] object-cover brightness-75"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 10, repeat: Infinity }}
                        />

                        <div className="absolute flex flex-col justify-center items-center h-full w-full px-10 md:px-24 text-white bg-black/40">
                            <motion.h1
                                className="text-3xl text-center md:text-5xl font-bold"
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {slide.title}
                            </motion.h1>
                            <motion.p
                                className="mt-4 text-center text-lg md:text-xl max-w-xl"
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.3 }}
                            >
                                {slide.desc}
                            </motion.p>
                            <MotionLink
                                to="/allFoods"
                                variants={buttonVariants}
                                whileHover="hover"
                                className="mt-6 btn text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                            >
                                Explore All Foods
                            </MotionLink>
                        </div>

                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a href={`#slide${index === 0 ? slides.length : index}`} className="btn btn-circle">❮</a>
                            <a href={`#slide${index === slides.length - 1 ? 1 : index + 2}`} className="btn btn-circle">❯</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banner;
