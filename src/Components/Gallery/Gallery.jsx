import React from 'react';

const Gallery = () => {

    const galleryImages = [
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=400&fit=crop",
    "https://plus.unsplash.com/premium_photo-1664285652180-f70ddda17717?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=500",
    "https://plus.unsplash.com/premium_photo-1683121341746-defea7bfc148?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dm9sdW50ZWVyJTJDZG9uYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
    "https://images.unsplash.com/photo-1758599668178-d9716bbda9d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbW11bml0eSUyQ3ZvbHVudGVlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500",
    "https://plus.unsplash.com/premium_photo-1681140560925-a50f402b8525?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJlZS1wbGFudGF0aW9uJTJDdm9sdW50ZWVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
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