import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const images = [
        "https://i.ibb.co/GDPkYDJ/side-view-chicken-roll-grilled-chicken-lettuce-cucumber-tomato-mayo-pita-141793-4849.jpg",
        "https://i.ibb.co/CK1dMLx2/plate-with-keto-diet-food-cherry-tomatoes-chicken-breast-eggs-carrot-salad-with-arugula-spinach-keto.jpg",
        "https://i.ibb.co/1thN4R3Q/grilled-beef-burger-with-fries-cheese-tomato-generative-ai-188544-8466.jpg",
        "https://i.ibb.co/dsFN0BXg/mixed-pizza-with-various-ingridients-140725-3790.jpg",
        "https://i.ibb.co/kVP6mb78/dietary-salad-with-tomatoes-feta-lettuce-spinach-pine-nuts-2829-20128.jpg",
        "https://i.ibb.co/ycjNLhcw/ai-generated-cake-picture-23-2150649466.jpg",
        "https://i.ibb.co/8LSYZPYR/italian-pasta-spaghetti-with-meatballs-parmesan-cheese-black-plate-dark-rustic-wood-background-dinne.jpg",
        "https://i.ibb.co/9kXvBXHR/grilled-beef-steak-with-fries-grilled-tomato-pepper-sauces-140725-10545.jpg",
        "https://i.ibb.co/V0ZP1z90/big-sandwich-with-chicken-kebab-lettuce-2829-16770.jpg",
        "https://i.ibb.co/NdqNNB58/strawberry-milkshake-table-140725-847.jpg"
    ];

    const slides = images.map(src => ({ src }));

    return (
        <div>
            <Helmet>
                <title>Management Resturent || Gellary</title>
            </Helmet>
            {/* Page Title Banner */}
            <div
                className="relative h-60 md:h-150 bg-cover bg-center flex items-center text-white justify-center"
                style={{
                    backgroundImage: "url('https://i.ibb.co/1tg4yZf2/healthy-food-concept-banner-template-23-2148811873.jpg')"
                }}
            >
              
            </div>

            {/* Gallery Section */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Gallery ${idx}`}
                        className="w-full h-40 object-cover rounded cursor-pointer hover:scale-105 transition"
                        onClick={() => {
                            setIndex(idx);
                            setOpen(true);
                        }}
                    />
                ))}
            </div>

            {/* Lightbox */}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                index={index}
            />
        </div>
    );
};

export default Gallery;

