import React from 'react';
import { Link } from 'react-router';

const EventCard = ({event}) => {
  console.log(event);
    return (
<div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={event.thumbnail}
        alt=""
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
            {event.eventType}
          </span>
          <span className="text-xs text-gray-500">{event.location}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{event.location}</p>

        <p className="text-sm font-medium text-gray-700 mb-4">
          Date: {event.eventDate}
        </p>

        <Link
          
          className="block w-full text-center bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          View Event
        </Link>
      </div>
    </div>
    );
};

export default EventCard;