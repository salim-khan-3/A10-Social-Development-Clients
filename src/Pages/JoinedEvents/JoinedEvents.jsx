// // import React, { useEffect,use, useState } from "react";
// import { use, useEffect, useState } from "react";
// import { AuthContext } from "../../Context/AuthContext";
// import toast from "react-hot-toast";
// import Loader from "../../Components/Loader/Loader";

// const JoinedEvents = () => {
//   const { user } = use(AuthContext);
//   const [joinedEvents, setJoinedEvents] = useState([]);
//   const [loading, setLoading] = useState(true);



//   useEffect(() => {
//   if (!user) return;

//   // fetch joined events
//   fetch(`https://social-developments-server.vercel.app/join_event/${user.email}`, {
//     headers: {
//       authorization: `Bearer ${user.accessToken}`,
//     },
//   })
//     .then(res => res.json())
//     .then(async (joinedData) => {
//       // fetch all events
//       const eventsRes = await fetch(`https://social-developments-server.vercel.app/events`);
//       const allEvents = await eventsRes.json();

//       // filter joined events that still exist
//       const filteredJoined = joinedData.filter(j =>
//         allEvents.some(e => e._id === j.eventId)
//       );

//       const sortedData = filteredJoined.sort(
//         (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
//       );

//       setJoinedEvents(sortedData);
//       setLoading(false);
//     })
//     .catch(err => {
//       console.error(err);
//       toast.error("Failed to fetch joined events");
//       setLoading(false);
//     });
// }, [user]);


//   if (loading) {
//     return (
//       <div className=" flex items-center justify-center">
//         <Loader></Loader>
//       </div>
//     );
//   }

//   if (!joinedEvents.length) {
//     return (
//       <div className="flex flex-col py-9 items-center justify-center">
//         <p className="text-gray-500 text-lg">
//           You haven't joined any events yet.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="  py-10 md:py-20 px-4 md:px-10">
//       <h1 className="text-2xl font-bold text-center mb-6  bg-white dark:text-black">
//         My Joined Events
//       </h1>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {joinedEvents.map((event) => (
//           <div
//             key={event._id}
//             className="bg-white dark:text-black rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
//           >
//             <img
//               src={event.thumbnail}
//               alt={event.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4 space-y-2">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 {event.title}
//               </h2>
//               <p className="text-gray-600 text-sm">{event.location}</p>
//               <p className="text-gray-500 text-sm">
//                 {new Date(event.eventDate).toLocaleDateString("en-GB", {
//                   day: "numeric",
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </p>
//               <p className="">{user.email}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JoinedEvents;










import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader/Loader";

const JoinedEvents = () => {
  const { user } = use(AuthContext);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`https://social-developments-server.vercel.app/join_event/${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
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
      <div className="flex items-center justify-center">
        <Loader></Loader>
      </div>
    );
  }

  if (!joinedEvents.length) {
    return (
      <div className="flex flex-col py-9 items-center justify-center">
        <p className="text-gray-500 text-lg">
          You haven't joined any events yet.
        </p>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-20 px-4 md:px-10">
      <h1 className=" font-bold text-center mb-6 text-4xl text-cyan-400">
        My Joined Events
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {joinedEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white dark:text-black rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] relative"
          >
            {/* {event.isEventUpdated && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full z-10">
                Updated
              </div>
            )} */}
            
            <img
              src={event.currentThumbnail || event.thumbnail}
              alt={event.currentTitle || event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {event.currentTitle || event.title}
              </h2>
              <p className="text-gray-600 text-sm">
                {event.currentDescription || event.description}
              </p>
              <p className="text-gray-600 text-sm">
                {event.currentLocation || event.location}
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(event.currentEventDate || event.eventDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-blue-600 text-sm">{event.currentEventType || event.eventType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinedEvents;