import React from 'react';

const RestaurantHero = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Food Images */}
          <div className="relative">
            {/* Main Pizza Image */}
            <div className="relative z-10">
              <div className="relative">
                {/* Floating Basil Leaves */}
                <div className="absolute -top-8 -left-8 w-24 h-24 animate-bounce">
                  <div className="text-6xl">🌿</div>
                </div>
                
                <div className="absolute top-0 right-0 w-20 h-20 animate-pulse">
                  <div className="text-5xl">🌿</div>
                </div>

                {/* Pizza */}
                <div className="relative bg-white rounded-full p-4 shadow-2xl">
                  <div className="text-9xl transform hover:rotate-12 transition-transform duration-300">
                    🍕
                  </div>
                </div>

                {/* Floating Vegetables */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 animate-bounce delay-100">
                  <div className="text-4xl">🍅</div>
                </div>
                
                <div className="absolute top-1/4 -left-6 w-14 h-14 animate-pulse delay-200">
                  <div className="text-3xl">🫑</div>
                </div>
              </div>
            </div>

            {/* Grilled Fish Card */}
            <div className="absolute bottom-0 right-0 lg:right-12 bg-gray-900 rounded-2xl p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 z-20">
              <div className="flex items-center gap-4">
                <div className="text-6xl">🐟</div>
                <div>
                  <p className="text-white font-semibold">Grilled Fish</p>
                  <p className="text-gray-400 text-sm">Fresh & Delicious</p>
                </div>
              </div>
              {/* Red Sauce Bowl */}
              <div className="absolute -top-8 -right-8 bg-red-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                <div className="text-3xl">🥣</div>
              </div>
            </div>

            {/* Floating Chili Pepper */}
            <div className="absolute top-1/4 right-1/4 animate-spin-slow">
              <div className="text-5xl transform rotate-45">🌶️</div>
            </div>

            {/* Bottom Basil Leaves */}
            <div className="absolute -bottom-8 left-1/4 w-20 h-20 animate-pulse">
              <div className="text-5xl">🌿</div>
            </div>

            {/* Lemon Slice */}
            <div className="absolute bottom-1/4 -left-4 w-12 h-12 animate-bounce">
              <div className="text-3xl">🍋</div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-block">
              <span className="text-red-500 uppercase text-sm font-semibold tracking-wider">
                ABOUT OUR RESTAURANT
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              WE INVITE YOU TO VISIT OUR FAST FOOD{' '}
              <span className="text-red-500">RESTAURANT</span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              At the heart of our kitchen are bold flavors, high-quality ingredients, and 
              a commitment to consistency. From juicy burgers, crispy fries, and cheesy 
              pizzas to spicy wraps and refreshing drinks, every item on our menu is made 
              to order and packed with taste.
            </p>

            {/* Owner Info */}
            <div className="pt-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Parvez Hossain Imon
              </h3>
              <p className="text-gray-500">Restaurant owner</p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide">
                VISIT OUR RESTAURANT
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default RestaurantHero;