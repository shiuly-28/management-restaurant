import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

function SalesPromotion() {
    const { darkMode } = useContext(AuthContext)
    const promotions = [
        {
            title: "50% Off on Selected Items",
            desc: "Grab your favorite products at half price. Limited time offer!",
            img: "https://i.ibb.co.com/LdgCXKTv/Healthy-Food-Card-Landscape.png",
            btn: "Shop Now"
        },
        {
            title: "Buy 1 Get 1 Free",
            desc: "Double the fun with our exclusive buy one get one free deal.",
            img: "https://i.ibb.co.com/1YH1Y1ZQ/Special-Food-Card-Landscape.png",
            btn: "Discover More"
        },
        {
            title: "Free Shipping Over $50",
            desc: "Enjoy free delivery on all orders above $50. Shop more and save more with our fast.",
            img: "https://i.ibb.co.com/cSNXG1hJ/Orange-and-Black-Modern-Prawn-Dim-Sum-Recipe-Card.png",
            btn: "Learn More"
        },
        {
            title: "Weekend Special Discount",
            desc: "Get an extra 20% off on all orders every weekend. Don't miss out!",
            img: "https://i.ibb.co.com/cXbyTrxC/Red-and-Green-Modern-Fruit-Salad-Recipe-Card.png",
            btn: "Grab Deal"
        }
    ];

    return (
        <section className=" py-10 px-6 rounded-lg my-10 ">
            <h2 className="text-3xl font-bold mb-6 text-center text-yellow-800">
                Special Sales Promotion
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {promotions.map((promo, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-5 rounded shadow cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                        <img
                            src={promo.img}
                            alt={promo.title}
                            className="w-full h-60 object-cover  rounded mb-4"
                        />
                        <h3 className={`${darkMode ? "text-gray-300" : "text-black"}  text-center font-bold text-2xl`}>{promo.title}</h3>
                        <p className={`${darkMode ? "text-gray-300" : "text-black"}  text-center font-bold `}>{promo.desc}</p>

                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default SalesPromotion;
