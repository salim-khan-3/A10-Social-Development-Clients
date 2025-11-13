// import React, { useEffect,use, useState } from "react";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const JoinedEvents = () => {
  const { user } = use(AuthContext);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(user);
  // useEffect(() => {
  //   if (!user) return;

  //   fetch(`http://localhost:3000/join_event/${user.email}`, {
  //         headers: {
  //           authorization: `Bearer ${user.accessToken}`
  //         }
  //       })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const sortedData = data.sort(
  //         (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
  //       );
  //       setJoinedEvents(sortedData);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       toast.error("Failed to fetch joined events");
  //       setLoading(false);
  //     });
  // }, [user]);



  useEffect(() => {
  if (!user) return;

  // fetch joined events
  fetch(`https://social-developments-server.vercel.app/join_event/${user.email}`, {
    headers: {
      authorization: `Bearer ${user.accessToken}`,
    },
  })
    .then(res => res.json())
    .then(async (joinedData) => {
      // fetch all events
      const eventsRes = await fetch(`https://social-developments-server.vercel.app/events`);
      const allEvents = await eventsRes.json();

      // filter joined events that still exist
      const filteredJoined = joinedData.filter(j =>
        allEvents.some(e => e._id === j.eventId)
      );

      const sortedData = filteredJoined.sort(
        (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
      );

      setJoinedEvents(sortedData);
      setLoading(false);
    })
    .catch(err => {
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
    <div className="  py-10 md:py-20 px-4 md:px-10">
      <h1 className="text-2xl font-bold text-center mb-6  bg-white dark:text-black">
        My Joined Events
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {joinedEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white dark:text-black rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
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
              <p className="">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinedEvents;
