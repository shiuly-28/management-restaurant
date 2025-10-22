import React from 'react';

const RestaurantHero = () => {
  return (
    <div className=" bg-white py-12 px-4 lg:px-8">
      <div className="max-w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        
        {/* ✅ Left Side - Image */}
        <div className="flex justify-center" data-aos="fade-up-right">
          <img
            src="https://i.postimg.cc/x82jyTc8/photo-1512152272829-e3139592d56f.jpg" 
            alt="Restaurant"
            className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* ✅ Right Side - Content */}
        <div className="space-y-6 text-center lg:text-left" data-aos="fade-up-left">
          <span className="text-green-500 uppercase text-sm font-semibold tracking-wider">
            About Our Restaurant
          </span>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Welcome to Our <span className="text-green-500">Fast Food</span> Heaven 🍔
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            Discover the authentic taste of freshly prepared fast food. From cheesy pizzas and 
            spicy wings to refreshing drinks — we serve happiness in every bite.
          </p>

          <div className="pt-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Parvez Hossain Imon</h3>
            <p className="text-gray-500">Restaurant Owner</p>
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide">
            Visit Our Restaurant
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;
