import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div>

            <div className="w-full min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white text-center p-6 sm:p-10 rounded-xl shadow-md max-w-md w-full">
                    <img
                        src="https://i.ibb.co/LzPFvjZC/download.jpg"
                        alt="Error Illustration"
                        className="w-full h-56 sm:h-64 object-contain mb-6 rounded-lg"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
                    <p className="text-gray-600 mb-6">
                        Sorry, the page you are looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Error404;