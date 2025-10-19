import React, { useState } from "react";

const RestaurantMenu = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const menuItems = [
    {
      id: 1,
      name: "Chicken Wings",
      category: "appetizer",
      price: "350",
      description: "Spicy chicken wings served with tangy sauce.",
      badge: "Popular",
      emoji: "🍗",
    },
    {
      id: 2,
      name: "Caesar Salad",
      category: "appetizer",
      price: "280",
      description: "Fresh vegetables topped with special dressing.",
      badge: "Delicious",
      emoji: "🥗",
    },
    {
      id: 3,
      name: "Kacchi Biryani",
      category: "main",
      price: "450",
      description: "Traditional clay-pot cooked biryani full of aroma.",
      badge: "Special",
      emoji: "🍛",
    },
    {
      id: 4,
      name: "Special Pasta",
      category: "main",
      price: "380",
      description: "Creamy Italian pasta served with white sauce.",
      badge: "Chef’s Choice",
      emoji: "🍝",
    },
    {
      id: 5,
      name: "Grilled Chicken",
      category: "main",
      price: "520",
      description: "Served with fresh vegetables and potato wedges.",
      badge: "Top Rated",
      emoji: "🍖",
    },
    {
      id: 6,
      name: "Chocolate Cake",
      category: "dessert",
      price: "220",
      description: "Rich chocolate layered cake with ice cream.",
      badge: "Sweet",
      emoji: "🍰",
    },
    {
      id: 7,
      name: "Crème Brûlée",
      category: "dessert",
      price: "250",
      description: "Classic French-style creamy custard dessert.",
      badge: "Premium",
      emoji: "🍮",
    },
    {
      id: 8,
      name: "Coffee Latte",
      category: "beverage",
      price: "180",
      description: "Smooth espresso mixed with steamed milk.",
      badge: "Hot",
      emoji: "☕",
    },
    {
      id: 9,
      name: "Fresh Juice",
      category: "beverage",
      price: "150",
      description: "Fresh fruit juice (Mango / Orange / Watermelon).",
      badge: "Cool",
      emoji: "🥤",
    },
  ];

  const categories = [
    { id: "all", label: "All" },
    { id: "appetizer", label: "Appetizers" },
    { id: "main", label: "Main Course" },
    { id: "dessert", label: "Desserts" },
    { id: "beverage", label: "Beverages" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-11/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-500 mb-4 tracking-wide">
            Our Menu
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A Taste of Perfection Awaits You 🍽️
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-green-500 to-green-500 text-white shadow-lg shadow-green-500/50 scale-105"
                  : "bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover:scale-105"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 group bg-white dark:bg-gray-800"
            >
              {/* Image / Emoji Section */}
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-500 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-300">
                {item.emoji}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-green-400 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-green-500">
                    {item.price} ৳
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <span className="inline-block px-4 py-2 bg-green-500/20 border border-green-500 rounded-full text-sm text-green-600 font-medium">
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-400">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
