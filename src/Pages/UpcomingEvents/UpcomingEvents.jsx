import React, { useEffect, useState } from "react";
import EventCard from "../../Components/EventCard/EventCard";
import { useLoaderData } from "react-router";
import { FaSearch } from "react-icons/fa";

const UpcomingEvents = () => {
  const events = useLoaderData();

  const [upcomingEvents, setUpcomingEvents] = useState(events);
  const [loading, setLoading] = useState(false);


    // filter out past events on initial load
  useEffect(() => {
    const today = new Date();
    const filteredEvents = events.filter((event) => new Date(event.eventDate) >= today);
    setUpcomingEvents(filteredEvents);
  }, [events]);

  // search function 
  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    console.log(search_text);
    setLoading(true);

    fetch(`http://localhost:3000/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpcomingEvents(data);
        setLoading(false);
      });
  };

// filter function 
  const handleFilter = (e) => {
    const eventType = e.target.eventType.value;
    setLoading(true);

    fetch(`http://localhost:3000/filter?eventType=${eventType}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUpcomingEvents(data);
        setLoading(false);
      });
  }

  if (loading) {
    return <div>spiner...</div>;
  }
  return (
    <div>

      <h1 className="text-center text-5xl font-bold my-10">Upcoming Events</h1>

     <div className="flex px-4 items-center flex-col md:flex-row justify-between">
       {/* search form */}
      <form
        onSubmit={handleSearch}
        className="flex mt-10 items-center justify-center gap-2 bg-white dark:bg-gray-800 shadow-md rounded-full px-4 py-2 w-full max-w-md transition-all duration-300"
      >
        <FaSearch className="text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          name="search"
          placeholder="Search events..."
          className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-full transition-all duration-200"
        >
          Search
        </button>
      </form>

      {/* filter form  */}
        <form
        onSubmit={handleFilter}
        className="flex items-center justify-center gap-3 mt-6 bg-white dark:bg-gray-800 shadow-md rounded-full px-4 py-2 w-full max-w-md transition-all duration-300"
      >
        <select
          name="eventType"
          className="flex-1 bg-transparent border-none outline-none text-white"
        >
          <option className="text-gray-800" value="">All Types</option>
          <option className="text-gray-800" value="Cleanup">Cleanup</option>
          <option className="text-gray-800" value="Plantation">Plantation</option>
          <option className="text-gray-800" value="Donation">Donation</option>
          <option className="text-gray-800" value="Education">Education</option>
          <option className="text-gray-800" value="Health Camp">Health Camp</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-full transition-all duration-200"
        >
          Filter
        </button>
      </form>
     </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 py-10 lg:px-0 ">
        {upcomingEvents.map((event) => (
          <EventCard event={event} key={event._id}></EventCard>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
