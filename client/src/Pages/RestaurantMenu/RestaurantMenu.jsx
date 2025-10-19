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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 mb-4 tracking-wide">
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
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50 scale-105'
                  : 'bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white hover:scale-105'
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
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 group"
            >
              {/* Image Section */}
              <div className="h-48 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-300">
                {item.emoji}
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-2xl font-bold text-orange-500">
                    {item.price} ৳
                  </span>
                </div>

                <p className="text-gray-400 mb-4 leading-relaxed">
                  {item.description}
                </p>

                <span className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500 rounded-full text-sm text-orange-400 font-medium">
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