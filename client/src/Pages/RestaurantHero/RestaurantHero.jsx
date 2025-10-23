import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const RestaurantHero = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What are your restaurant opening hours?",
      answer: "We are open 7 days a week from 11:00 AM to 11:00 PM. On weekends, we extend our hours until midnight to serve you better!"
    },
    {
      question: "Do you offer home delivery service?",
      answer: "Yes! We provide fast and reliable home delivery within a 5km radius. You can order through our website, phone, or popular food delivery apps."
    },
    {
      question: "Are there vegetarian and vegan options available?",
      answer: "Absolutely! We have a dedicated menu section for vegetarian and vegan dishes. Our chefs prepare delicious plant-based burgers, pizzas, and salads."
    },
    {
      question: "Can I make a reservation for large groups?",
      answer: "Yes, we accept reservations for groups of 6 or more. Please call us at least 24 hours in advance to ensure we can accommodate your party comfortably."
    },
    {
      question: "Do you accommodate food allergies?",
      answer: "Customer safety is our priority. Please inform our staff about any allergies or dietary restrictions, and our chefs will prepare your meal accordingly."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 px-4 lg:px-8">
      <div className="max-w-11/12 mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <span className="text-green-500 uppercase text-sm font-semibold tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Frequently Asked <span className="text-green-500">Questions</span>
          </h2>
          <p className=" text-lg max-w-2xl mx-auto">
            Find answers to common questions about our restaurant, services, and menu offerings.
          </p>
        </div>

        {/* FAQ Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          
          {/* Left Side - FAQ Items */}
          <div className="space-y-4" data-aos="fade-up-right">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 hover:border-green-500 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-base font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-green-500 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 pt-2 bg-gray-50">
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center border border-transparent hover:border-green-500 p-5 rounded-2xl" data-aos="fade-up-left">
            <img
              src="https://i.postimg.cc/0jBc66pq/photo-1512152272829-e3139592d56f.jpg" 
              alt="Restaurant FAQ"
              className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl" data-aos="fade-up">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our friendly team is here to help you. Feel free to reach out!
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHero;