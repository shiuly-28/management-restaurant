// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const RestaurantMenu = () => {
//   useEffect(() => {
//     AOS.init({ duration: 800, once: true });
//   }, []);

//   const menuItems = [
//     {
//       id: 1,
//       name: "Grilled Chicken",
//       description: "Juicy grilled chicken served with garlic sauce and veggies.",
//       price: "$12.99",
//       image: "https://i.ibb.co/nLLR4B9/grilled-chicken.jpg",
//       category: "Main Course",
//     },
//     {
//       id: 2,
//       name: "Caesar Salad",
//       description: "Crispy lettuce with parmesan, croutons, and Caesar dressing.",
//       price: "$8.50",
//       image: "https://i.ibb.co/1v5fqxT/caesar-salad.jpg",
//       category: "Appetizer",
//     },
//     {
//       id: 3,
//       name: "Chocolate Lava Cake",
//       description: "Warm chocolate cake with a molten chocolate center.",
//       price: "$6.00",
//       image: "https://i.ibb.co/Wtv0pLr/chocolate-lava-cake.jpg",
//       category: "Dessert",
//     },
//     {
//       id: 4,
//       name: "Beef Burger Deluxe",
//       description: "Grilled beef patty with melted cheese and house sauce.",
//       price: "$10.99",
//       image: "https://i.ibb.co/LvZ9Xnh/beef-burger.jpg",
//       category: "Main Course",
//     },
//     {
//       id: 5,
//       name: "Margherita Pizza",
//       description: "Classic Italian pizza with mozzarella, basil, and tomato sauce.",
//       price: "$9.99",
//       image: "https://i.ibb.co/vJbMZZY/margherita-pizza.jpg",
//       category: "Main Course",
//     },
//     {
//       id: 6,
//       name: "Prawn Tempura",
//       description: "Crispy fried prawns with light soy dipping sauce.",
//       price: "$11.00",
//       image: "https://i.ibb.co/q9PnPz8/prawn-tempura.jpg",
//       category: "Appetizer",
//     },
//     {
//       id: 7,
//       name: "Pasta Alfredo",
//       description: "Creamy fettuccine pasta with parmesan and chicken.",
//       price: "$10.50",
//       image: "https://i.ibb.co/QvFRxBv/pasta-alfredo.jpg",
//       category: "Main Course",
//     },
//     {
//       id: 8,
//       name: "Fruit Smoothie",
//       description: "Refreshing smoothie made with seasonal fruits and yogurt.",
//       price: "$5.50",
//       image: "https://i.ibb.co/jhz5dL3/fruit-smoothie.jpg",
//       category: "Drinks",
//     },
//     {
//       id: 9,
//       name: "Tiramisu",
//       description: "Classic Italian dessert layered with coffee and mascarpone cream.",
//       price: "$7.25",
//       image: "https://i.ibb.co/nMdwrnM/tiramisu.jpg",
//       category: "Dessert",
//     },
//   ];

//   return (
//     <section className="py-16 bg-gray-50 dark:bg-gray-900">
//       <div className="container mx-auto text-center">
//         <h2
//           className="text-4xl font-bold text-green-600 mb-3"
//           data-aos="fade-up"
//         >
//           Our Restaurant Menu
//         </h2>
//         <p
//           className="text-gray-600 dark:text-gray-300 mb-10"
//           data-aos="fade-up"
//           data-aos-delay="100"
//         >
//           Explore our handpicked dishes made with love, freshness, and flavor 🍴
//         </p>

//         <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-4">
//           {menuItems.map((item, index) => (
//             <div
//               key={item.id}
//               data-aos="zoom-in"
//               data-aos-delay={index * 100}
//               className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition transform p-5"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="rounded-xl h-48 w-full object-cover mb-4 hover:opacity-90 transition"
//               />
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
//                   {item.name}
//                 </h3>
//                 <span className="text-green-600 font-bold">{item.price}</span>
//               </div>
//               <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
//                 {item.description}
//               </p>
//               <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
//                 {item.category}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default RestaurantMenu;


import React, { useState } from 'react';

const RestaurantMenu = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const menuItems = [
    {
      id: 1,
      name: 'চিকেন উইংস',
      category: 'appetizer',
      price: '৩৫০',
      description: 'মসলাদার চিকেন উইংস সস এর সাথে পরিবেশিত',
      badge: 'জনপ্রিয়',
      emoji: '🍤'
    },
    {
      id: 2,
      name: 'সিজার সালাদ',
      category: 'appetizer',
      price: '২৮০',
      description: 'তাজা সবজি ও বিশেষ ড্রেসিং এর সাথে',
      badge: 'সুস্বাদু',
      emoji: '🥗'
    },
    {
      id: 3,
      name: 'কাচ্চি বিরিয়ানি',
      category: 'main',
      price: '৪৫০',
      description: 'ঐতিহ্যবাহী হাড়িতে রান্না করা বিরিয়ানি',
      badge: 'বিশেষ',
      emoji: '🍛'
    },
    {
      id: 4,
      name: 'স্পেশাল পাস্তা',
      category: 'main',
      price: '৩৮০',
      description: 'ক্রিমি সস এর সাথে ইটালিয়ান পাস্তা',
      badge: "শেফ'স চয়েস",
      emoji: '🍝'
    },
    {
      id: 5,
      name: 'গ্রিলড চিকেন',
      category: 'main',
      price: '৫২০',
      description: 'ভেজিটেবল ও পটেটো ওয়েজেস সহ',
      badge: 'জনপ্রিয়',
      emoji: '🍖'
    },
    {
      id: 6,
      name: 'চকলেট কেক',
      category: 'dessert',
      price: '২২০',
      description: 'রিচ চকলেট লেয়ার কেক আইসক্রিম সহ',
      badge: 'মিষ্টি',
      emoji: '🍰'
    },
    {
      id: 7,
      name: 'ক্রিম ব্রুলে',
      category: 'dessert',
      price: '২৫০',
      description: 'ফ্রেঞ্চ স্টাইল কাস্টার্ড ডেজার্ট',
      badge: 'প্রিমিয়াম',
      emoji: '🍮'
    },
    {
      id: 8,
      name: 'কফি লাট্টে',
      category: 'beverage',
      price: '১৮০',
      description: 'এসপ্রেসো ও স্টিমড মিল্ক',
      badge: 'গরম',
      emoji: '☕'
    },
    {
      id: 9,
      name: 'ফ্রেশ জুস',
      category: 'beverage',
      price: '১৫০',
      description: 'তাজা ফলের জুস (আম/কমলা/তরমুজ)',
      badge: 'ঠান্ডা',
      emoji: '🥤'
    }
  ];

  const categories = [
    { id: 'all', label: 'সব দেখুন' },
    { id: 'appetizer', label: 'স্টার্টার' },
    { id: 'main', label: 'মূল খাবার' },
    { id: 'dessert', label: 'ডেজার্ট' },
    { id: 'beverage', label: 'পানীয়' }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-500 mb-4 tracking-wide">
            আমাদের মেনু
          </h1>
          <p className="text-xl text-gray-300">স্বাদের অনন্য সমাহার</p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-green-500 to-green-500 text-white shadow-lg shadow-green-500/50 scale-105'
                  : 'bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover:scale-105'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className=" backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 group"
            >
              {/* Image Section */}
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-500 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-300">
                {item.emoji}
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-green-500">
                    {item.price} ৳
                  </span>
                </div>

                <p className=" mb-4 leading-relaxed">
                  {item.description}
                </p>

                <span className="inline-block px-4 py-2 bg-green-500/20 border border-green-500 rounded-full text-sm text-green-400 font-medium">
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-400">কোনো আইটেম পাওয়া যায়নি</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
