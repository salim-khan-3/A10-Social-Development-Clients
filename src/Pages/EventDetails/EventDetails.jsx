import {  useNavigate, useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { use, useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";

const EventDetails = () => {
  // const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const { id } = useParams()
   const [data, setData] = useState({});
   const [loading,setLoading] = useState(true);

  useEffect(()=>{


    fetch(`https://social-developments-server.vercel.app/events/${id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setData(data);
          setLoading(false)
        })
  },[id,user])

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error("Please log in to join this event");
      navigate("/login");
      return;
    }

    const joinData = {
      title: data.title,
      description: data.description,
      eventType: data.eventType,
      thumbnail: data.thumbnail,
      location: data.location,
      eventDate: data.eventDate,
      userEmail: user.email,
      eventId: String(data._id), 
    };

    try {
      const res = await fetch(`https://social-developments-server.vercel.app/join_event/${user.email}`, {
          headers: {
            authorization: `Bearer ${user.accessToken}`
          }
        });
      const joinedEvents = await res.json();

      const alreadyJoined = joinedEvents.some(
        (event) => event.eventId === data._id
      );

      if (alreadyJoined) {
        toast.error("You have already joined this event!");
        return;
      }

      const joinRes = await fetch("https://social-developments-server.vercel.app/join_event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(joinData),
      });

      if (joinRes.ok) {
        toast.success("Successfully joined the event!");
      } else {
        toast.error("Failed to join event. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const formattedDate = new Date(data.eventDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  if(loading) {
    return <div>
      <Loader></Loader>
    </div>
  }

  return (
<div className="py-10 px-4 md:px-10 bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
  <div className="max-w-5xl mx-auto flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-emerald-200 hover:-translate-y-1">
    
    {/* Thumbnail */}
    <div className="md:w-1/2 w-full relative">
      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-full h-80 md:h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden"></div>
      <div className="absolute bottom-3 left-4 text-white md:hidden">
        <h2 className="text-2xl font-bold drop-shadow-md">{data.title}</h2>
      </div>
    </div>

    {/* Info Section */}
    <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 border-b-2 border-emerald-500 inline-block pb-1">
          {data.title}
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
          {data.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm shadow-sm">
            {data.eventType}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 font-medium text-sm shadow-sm">
            📍 {data.location}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 font-medium text-sm shadow-sm">
            📅 {formattedDate}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          Created by:{" "}
          <span className="font-medium text-emerald-700 dark:text-emerald-400">
            {data.createdBy}
          </span>
        </p>
      </div>

      {/* Join Button */}
      <div className="mt-8">
        <button
          onClick={handleJoinEvent}
          className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-emerald-300 transition-all duration-300"
        >
          🌱 Join Event
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default EventDetails;


