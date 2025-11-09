import React from 'react';

const Gallery = () => {

    const galleryImages = [
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98d10d?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1593113646773-028c26a2e64b?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1605000797533-1015b1e7e888?w=500&h=400&fit=crop",
  ];
    return (
<section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
          Event Gallery
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Real moments from our community-driven social service events
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <img
                src={src}
                alt={`Community event ${i + 1}`}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default Gallery;