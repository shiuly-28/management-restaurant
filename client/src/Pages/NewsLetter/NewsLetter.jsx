import { CheckCircle } from "lucide-react";
import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email before subscribing!");
      return;
    }
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div
      className="max-w-10/12 mx-auto py-12 mt-8 px-6 md:px-16 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-md border border-transparent 
      hover:border-green-400 transition-all duration-300
      bg-white dark:bg-gray-800"
      style={{
        background:
          "linear-gradient(to right, rgba(34,197,94,0.15), rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.15) 70%, rgba(34,197,94,0.15))",
      }}
    >
      {/* Left Text Section */}
      <div className="text-center md:text-left mb-6 md:mb-0">
        <span className="inline-block px-4 py-1 text-sm rounded-full bg-green-500 text-white font-medium mb-3">
          ● Stay in the loop
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400">
          Subscribe to our newsletter
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-base">
          Get exclusive food updates, offers, and tips directly to your inbox.
        </p>
      </div>

      {/* Right Input Section */}
      <div className="flex items-center w-full md:w-auto gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full md:w-80 px-4 py-3 text-gray-600 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600 
          focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:placeholder-gray-400"
        />
        <button
          onClick={handleSubscribe}
          className="px-6 py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-300 dark:bg-green-600 dark:hover:bg-green-500"
        >
          Subscribe
        </button>

        {success && (
          <div className="flex items-center text-black ml-3 animate-fadeIn">
            <CheckCircle size={20} className="mr-1" />
            <span>Subscribed Successfully</span>
          </div>
        )}
      </div>

      {/* Fade animation */}
      <style>
        {`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(10px);}
          to {opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
      `}
      </style>
    </div>
  );
};

export default NewsLetter;
