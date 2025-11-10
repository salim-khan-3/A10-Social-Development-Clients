import React from "react";
import EventCard from "../../Components/EventCard/EventCard";
import { useLoaderData } from "react-router";

const UpcomingEvents = () => {
    const events = useLoaderData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 py-10 lg:px-0 ">
      {
        events.map(event => <EventCard event={event} key={event._id}></EventCard>)
      }
    </div>
  );
};

export default UpcomingEvents;
