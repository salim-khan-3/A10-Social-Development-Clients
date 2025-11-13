import { use, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateEvent = () => {
  const { user } = use(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      eventType: e.target.type.value,
      thumbnail: e.target.thumbnail.value,
      location: e.target.location.value,
      eventDate: selectedDate,
      createdBy: user.email,
    };

    fetch("https://social-developments-server.vercel.app/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(data=> {
      console.log(data)
       toast.success("Event created successfully!");
       navigate("/upcoming");
    })
     .catch(() => toast.error("Failed to create event"));
    // console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white dark:text-black p-10 md:p-12 rounded-2xl shadow-2xl border border-gray-100">
          <h1 className="text-4xl font-extrabold text-center mb-10 text-emerald-700">
            🌳 Create a New Impact Event
          </h1>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event Title
              </label>
              <input
                name="title"
                type="text"
                id="title"
                placeholder="A catchy name for your event..."
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Explain what your event is about and its goal."
                required
                rows="5"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out resize-none"
              />
            </div>

            {/* Event Type Select & Location Input - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Type Select */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Event Type
                </label>
                <select
                  name="type"
                  id="type"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 appearance-none bg-white transition duration-150 ease-in-out"
                >
                  <option value="Cleanup">Cleanup</option>
                  <option value="Plantation">Plantation</option>
                  <option value="Donation">Donation</option>
                  <option value="Education">Education</option>
                  <option value="Health Camp">Health Camp</option>
                </select>
              </div>

              {/* Location Input */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  name="location"
                  type="text"
                  id="location"
                  placeholder="e.g. Mirpur 10, Dhaka"
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
                />
              </div>
            </div>

            {/* Thumbnail URL Input */}
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Thumbnail Image URL
              </label>
              <input
                name="thumbnail"
                type="url"
                id="thumbnail"
                placeholder="https://example.com/image.jpg"
                required
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out"
              />
            </div>

            {/* DatePicker */}
            <div>
              <label
                htmlFor="date-picker"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Event Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                placeholderText="Select a Future Date"
                id="date-picker"
                // Custom styling for the DatePicker input
                className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition duration-150 ease-in-out cursor-pointer"
                required
                showTimeSelect={false}
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Create Event Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;


