import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  ChartBarIcon, 
  ClipboardDocumentListIcon, 
  UserGroupIcon,
  BellAlertIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const featuresData = [
  {
    id: 1,
    title: "Menu Management System",
    description: "Easily manage your restaurant’s menu, prices, and categories in real time.",
    fullDescription:
      "Our Menu Management System lets restaurant owners have full control over their offerings. You can add new dishes, update prices instantly, organize food by categories, and manage item availability. This system helps you maintain an attractive and updated digital menu without any hassle.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    icon: ClipboardDocumentListIcon,
    rating: 4.9,
    users: "10K+",
    price: "Free",
    color: "bg-orange-500",
  },
  {
    id: 2,
    title: "Order Management & Tracking",
    description: "Track every order from kitchen to customer efficiently.",
    fullDescription:
      "Never lose track of orders again. Monitor dine-in, takeout, and delivery orders in real time. Coordinate between your staff, kitchen, and delivery team easily for smooth operation and happy customers.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
    icon: BellAlertIcon,
    rating: 4.8,
    users: "8K+",
    price: "From $1",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Sales Analytics Dashboard",
    description: "Visualize sales, profits, and customer insights with powerful charts.",
    fullDescription:
      "Get a clear view of your restaurant’s performance with our Analytics Dashboard. Track revenue, best-selling dishes, and customer trends. Use data-driven insights to improve your business strategy.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    icon: ChartBarIcon,
    rating: 4.7,
    users: "12K+",
    price: "From $0.5",
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Staff & Team Management",
    description: "Organize your restaurant team and monitor performance easily.",
    fullDescription:
      "Our Staff Management System helps manage roles, attendance, shifts, and performance from one place. Improve coordination and efficiency within your team effortlessly.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
    icon: UserGroupIcon,
    rating: 4.6,
    users: "7K+",
    price: "Free",
    color: "bg-purple-500",
  },
];

const FeatureDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const feature = featuresData.find((f) => f.id === parseInt(id));

  if (!feature) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Feature Not Found</h2>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const Icon = feature.icon;

  return (
    <div className="min-h-screen py-12">
      <Helmet>
        <title>{feature.title} - Management Restaurant</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-8 hover:text-green-500 transition"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="font-medium">Back to Features</span>
        </button>

        {/* Main Layout: Image Left, Details Right */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left - Image Section */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className={`p-4 rounded-xl shadow-lg ${feature.color}`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          {/* Right - Text Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              {feature.title}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {feature.description}
            </p>

            <div className="badge badge-success badge-lg">Restaurant Management</div>

            <div className="card bg-base-200 shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">📋 About This Feature</h2>
              <p className="text-base leading-relaxed opacity-90">
                {feature.fullDescription}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center mt-8">
              <div>
                <p className="text-3xl font-bold text-yellow-500">⭐</p>
                <p className="text-xl font-semibold">{feature.rating}</p>
                <p className="text-sm opacity-70">Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-500">👥</p>
                <p className="text-xl font-semibold">{feature.users}</p>
                <p className="text-sm opacity-70">Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-500">💰</p>
                <p className="text-xl font-semibold">{feature.price}</p>
                <p className="text-sm opacity-70">Price</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetails;
