// import React, { useEffect,use, useState } from "react";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const JoinedEvents = () => {
  const { user } = use(AuthContext);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(user);
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/join_event/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setJoinedEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch joined events");
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading your joined events...</p>
      </div>
    );
  }

  if (!joinedEvents.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg">
          You haven't joined any events yet.
        </p>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 py-10 md:py-20 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        My Joined Events
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {joinedEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src={event.thumbnail}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {event.title}
              </h2>
              <p className="text-gray-600 text-sm">{event.location}</p>
              <p className="text-gray-500 text-sm">
                {new Date(event.eventDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinedEvents;
