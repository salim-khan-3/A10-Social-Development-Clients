import React from "react";
import { CalendarPlus, HandHeart, BarChart3 } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Create Events",
      desc: "Easily organize social service events and inspire others to join your cause.",
      icon: <CalendarPlus className="w-14 h-14 text-emerald-600 group-hover:text-white transition" />,
      color: "from-emerald-100 to-teal-100",
      hoverColor: "from-emerald-500 to-teal-600",
    },
    {
      title: "Join & Volunteer",
      desc: "Be part of meaningful community initiatives and make a real impact.",
      icon: <HandHeart className="w-14 h-14 text-teal-600 group-hover:text-white transition" />,
      color: "from-teal-100 to-green-100",
      hoverColor: "from-teal-600 to-green-600",
    },
    {
      title: "Track Impact",
      desc: "Keep track of your activities and see your contribution history grow.",
      icon: <BarChart3 className="w-14 h-14 text-green-600 group-hover:text-white transition" />,
      color: "from-green-100 to-lime-100",
      hoverColor: "from-green-600 to-lime-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
          How It Works
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto text-lg">
          Just a few steps to connect, contribute, and change your community 🌱
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br ${feature.color} hover:${feature.hoverColor} rounded-3xl p-10 shadow-md hover:shadow-xl transition-all duration-500 text-center`}
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-800 group-hover:text-white transition">
                {feature.title}
              </h3>
              <p className="text-gray-700 group-hover:text-gray-100 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
