import React, { useState } from 'react';

function Newsletter() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (email) {
            setMessage('Thank you for subscribing!');
            setEmail('');
            // এখানে তোমার সাবস্ক্রিপশন API কল বা অন্য লজিক আসবে
        } else {
            setMessage('Please enter a valid email.');
        }
    };

    return (
        <section className="bg-primary text-white py-10 px-6 my-10 rounded-lg max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Subscribe to Our Newsletter</h2>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full md:flex-1 px-4 py-3 rounded text-black"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="px-6 py-3 bg-secondary hover:bg-secondary-dark rounded text-white font-semibold"
                >
                    Subscribe
                </button>
            </form>
            {message && <p className="text-center mt-4">{message}</p>}
        </section>
    );
}

export default Newsletter;
