// import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { use } from "react";

const EventDetails = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  console.log("EventDetails data:", data);

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
      const res = await fetch(`http://localhost:3000/join_event/${user.email}`);
      const joinedEvents = await res.json();

      const alreadyJoined = joinedEvents.some(
        (event) => event.eventId === data._id
      );

      if (alreadyJoined) {
        toast.error("You have already joined this event!");
        return;
      }

      const joinRes = await fetch("http://localhost:3000/join_event", {
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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
        {/* Thumbnail */}
        <div className="relative">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          {/* Edit Button (top-right corner) */}
          <button
            onClick={() => navigate(`/updateevent/${data._id}`)}
            className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg shadow-md transition"
          >
            Update Event
          </button>
        </div>

        {/* Info */}
        <div className="p-6 md:p-10 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {data.title}
          </h1>

          <p className="text-gray-700 md:text-lg leading-relaxed">
            {data.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 font-medium">
              {data.eventType}
            </span>
            <span className="px-4 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
              {data.location}
            </span>
            <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
              {formattedDate}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-3">
            Created by: <span className="font-medium">{data.createdBy}</span>
          </p>

          {/* Join Event Button */}
          <button
            onClick={handleJoinEvent}
            className="bg-emerald-600 px-8 py-4 rounded-full text-white hover:bg-emerald-700"
          >
            Join Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
