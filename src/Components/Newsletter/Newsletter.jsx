import React from "react";
import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="relative py-24 bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/papyrus.png')]"></div>

      <div className="relative container mx-auto px-6 text-center text-white">
        <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/15 p-10 rounded-3xl shadow-2xl border border-white/20">
          <div className="flex justify-center mb-6">
            <Mail className="w-14 h-14 text-white animate-pulse" />
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Stay Updated, Stay Involved 🌱
          </h2>
          <p className="text-lg md:text-xl mb-10 text-white/90">
            Subscribe to receive the latest updates about upcoming community
            events, volunteer opportunities, and impact stories.
          </p>

          <form className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-400 shadow-inner"
              required
            />
            <button
              type="submit"
              className="bg-white text-emerald-700 font-semibold px-8 py-4 rounded-full hover:bg-emerald-100 transition-all duration-300 shadow-md"
            >
              Subscribe
            </button>
          </form>

          <p className="mt-6 text-sm text-white/80">
            No spam. You can unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
