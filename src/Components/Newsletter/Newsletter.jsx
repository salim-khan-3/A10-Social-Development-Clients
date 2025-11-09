import React from "react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Never Miss an Event
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Subscribe to get updates on upcoming cleanup drives, tree plantations,
          and donation events in your area.
        </p>

        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
          />
          <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
            Subscribe
          </button>
        </div>

        <p className="mt-6 text-sm opacity-90">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
};

export default Newsletter;
