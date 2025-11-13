import React, { useEffect, useState } from "react";
import EventCard from "../../Components/EventCard/EventCard";
import { useLoaderData } from "react-router";
import { FaSearch } from "react-icons/fa";
import Loader from "../../Components/Loader/Loader";

const UpcomingEvents = () => {
  const events = useLoaderData();

  const [upcomingEvents, setUpcomingEvents] = useState(events);
  const [loading, setLoading] = useState(false);

  const filterUpcoming = (data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return data.filter((event) => {
      const eventDate = new Date(event.eventDate);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate > today;
    });
  };

  // filter out past events on initial load
  useEffect(() => {
    setUpcomingEvents(filterUpcoming(events));
  }, [events]);

  // search function
const handleSearch = (e) => {
  e.preventDefault();
  const searchText = e.target.search.value.trim();

  setLoading(true);

  if (!searchText) {
    // input is empty → show all upcoming events
    setUpcomingEvents(filterUpcoming(events));
    setLoading(false);
    return;
  }

  // otherwise, do the search API call
  fetch(`https://social-developments-server.vercel.app/search?search=${searchText}`)
    .then((res) => res.json())
    .then((response) => {
      const resultArray = response.success ? response.data : [];
      setUpcomingEvents(filterUpcoming(resultArray));
      setLoading(false);
    })
    .catch(() => setLoading(false));
};


  // filter function
const handleFilter = (e) => {
  e.preventDefault();
  const eventType = e.target.eventType.value;

  setLoading(true);

  if (!eventType) {
    // if "All Types" is selected, just show all upcoming events
    setUpcomingEvents(filterUpcoming(events));
    setLoading(false);
    return;
  }

  fetch(`https://social-developments-server.vercel.app/filter?eventType=${eventType}`)
    .then((res) => res.json())
    .then((response) => {
      const resultArray = response.success ? response.data : [];
      setUpcomingEvents(filterUpcoming(resultArray));
      setLoading(false);
    })
    .catch(() => setLoading(false));
};

  
  if (loading) {
    return <Loader></Loader>;
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
            placeholder="Search by events name..."
            className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-full transition-all duration-200"
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
            <option className="text-gray-800" value="">
              All Types
            </option>
            <option className="text-gray-800" value="Cleanup">
              Cleanup
            </option>
            <option className="text-gray-800" value="Plantation">
              Plantation
            </option>
            <option className="text-gray-800" value="Donation">
              Donation
            </option>
            <option className="text-gray-800" value="Education">
              Education
            </option>
            <option className="text-gray-800" value="Health Camp">
              Health Camp
            </option>
          </select>

          <button
            type="submit"
            className="bg-green-600 cursor-pointer hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-full transition-all duration-200"
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
