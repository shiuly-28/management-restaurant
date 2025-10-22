import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  ClipboardDocumentListIcon, 
  UserGroupIcon,
  CreditCardIcon,
  BellAlertIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    id: 1,
    title: "Menu Management",
    description: "Add, edit, and organize your menu items with real-time updates. Control pricing and availability instantly.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    icon: ClipboardDocumentListIcon,
    rating: 4.9,
    users: "10K+",
    price: "Free",
    trending: true,
    color: "bg-orange-500"
  },
  {
    id: 2,
    title: "Order Tracking",
    description: "Track all orders in real-time. Manage kitchen workflow and delivery status efficiently.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    icon: BellAlertIcon,
    rating: 4.8,
    users: "8K+",
    price: "From $1",
    trending: true,
    color: "bg-blue-500"
  },
  {
    id: 3,
    title: "Sales Analytics",
    description: "Get detailed insights on sales, revenue, and customer behavior. Make data-driven decisions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    icon: ChartBarIcon,
    rating: 4.7,
    users: "12K+",
    price: "From $0.5",
    trending: false,
    color: "bg-green-500"
  },
  {
    id: 4,
    title: "Staff Management",
    description: "Manage your team, assign roles, track attendance and monitor performance seamlessly.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    icon: UserGroupIcon,
    rating: 4.6,
    users: "7K+",
    price: "Free",
    trending: true,
    color: "bg-purple-500"
  },
  {
    id: 5,
    title: "Payment Processing",
    description: "Accept multiple payment methods securely. Integrate with popular payment gateways easily.",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80",
    icon: CreditCardIcon,
    rating: 4.8,
    users: "9K+",
    price: "From $2",
    trending: false,
    color: "bg-pink-500"
  },
  {
    id: 6,
    title: "System Settings",
    description: "Customize your restaurant settings, manage integrations, and control all system preferences.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80",
    icon: CogIcon,
    rating: 4.9,
    users: "15K+",
    price: "Free",
    trending: true,
    color: "bg-indigo-500"
  }
];

export default function FreshFood() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="py-20 px-4">
      <div className="max-w-11/12 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4">
            Popular Restaurant Features
          </h1>
          <p className="text-lg max-w-3xl mx-auto">
            Explore the most loved features of Restaurant Management System — secure, fast, and built for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="relative rounded-2xl overflow-hidden shadow-2xl group transform transition-transform duration-300 hover:scale-105" data-aos="zoom-in"
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                {/* Card Content */}
                <div className="relative z-10 p-6 flex flex-col justify-between h-full">
                  {/* Icon + Trending */}
                  <div className="flex justify-between items-start">
                    {feature.trending && (
                      <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        🔥 Trending
                      </div>
                    )}
                    <div className={`p-3 rounded-xl shadow-lg ${feature.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-auto text-white">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-200 mb-4 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1 text-yellow-400">
                        ⭐ <span className="font-semibold">{feature.rating}</span>
                      </div>
                      <div>{feature.users} users</div>
                    </div>

                    {/* Price & Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-400">{feature.price}</span>
                      <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
                        Try Now →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                {hoveredCard === feature.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 pointer-events-none rounded-2xl"></div>
                )}
              </div>
            );
          })}
        </div>

       
      </div>
    </div>
  );
}
