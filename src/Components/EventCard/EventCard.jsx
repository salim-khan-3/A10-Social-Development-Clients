import { Link } from "react-router";
import { motion } from "framer-motion";

const EventCard = ({ event }) => {
  return (
    <motion.div
      className="bg-white dark:text-black rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.img
        src={event.thumbnail}
        alt=""
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <motion.span
            className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {event.eventType}
          </motion.span>
          <span className="text-xs text-gray-500">{event.location}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{event.location}</p>

        <p>
          {new Date(event.eventDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <p className="my-5">{event.createdBy}</p>

        <Link
          to={`/eventdetails/${event._id}`}
          className="block w-full text-center bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          View Event
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
