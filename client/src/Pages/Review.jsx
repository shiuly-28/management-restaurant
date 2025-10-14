import React from 'react';

const reviewsData = [
    {
        id: 1,
        name: 'Rina Hasan',
        review: 'Great product quality and fast delivery. Highly recommend!',
        rating: 5,
    },
    {
        id: 2,
        name: 'Sajib Khan',
        review: 'Customer service was very helpful and responsive.',
        rating: 4,
    },
    {
        id: 3,
        name: 'Anika Rahman',
        review: 'Affordable prices and good variety of products.',
        rating: 4,
    },
];

function Reviews() {
    return (
        <section className="bg-gray-50 py-10 px-6 my-10 max-w-7xl mx-auto rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviewsData.map(({ id, name, review, rating }) => (
                    <div key={id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
                        <h3 className="font-semibold mb-2">{name}</h3>
                        <p className="text-gray-700 mb-4">{review}</p>
                        <div>
                            {[...Array(rating)].map((_, i) => (
                                <span key={i} className="text-yellow-400">&#9733;</span> // Star icon
                            ))}
                            {[...Array(5 - rating)].map((_, i) => (
                                <span key={i} className="text-gray-300">&#9733;</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Reviews;
