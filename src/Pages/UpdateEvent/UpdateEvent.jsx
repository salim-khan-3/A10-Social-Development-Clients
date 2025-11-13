import { use } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const UpdateEvent = () => {
  const {user} = use(AuthContext)
  const data = useLoaderData();
  // console.log(data);
  // const { user } = use(AuthContext);
  // const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      eventType: e.target.eventType.value,
      thumbnail: e.target.thumbnail.value,
      location: e.target.location.value,
      eventDate: e.target.eventDate.value,
    };

    console.log(formData);

    fetch(`https://social-developments-server.vercel.app/events/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Event updated successfully!");
      })
      .catch(() => toast.error("Failed to update event"));
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:text-black rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Update Event</h1>

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
              type="text"
              name="title"
              placeholder="Event Title"
              defaultValue={data.title}
              className="w-full border px-4 py-2 rounded-lg"
              required
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
              placeholder="Event Description"
              defaultValue={data.description}
              className="w-full border px-4 py-2 rounded-lg"
              rows={4}
              required
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
                name="eventType"
                defaultValue={data.eventType}
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
                type="text"
                name="location"
                placeholder="Location"
                defaultValue={data.location}
                className="w-full border px-4 py-2 rounded-lg"
                required
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
              type="text"
              name="thumbnail"
              placeholder="Thumbnail URL"
              defaultValue={data.thumbnail}
              className="w-full border px-4 py-2 rounded-lg"
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
            <input
              type="date"
              name="eventDate"
              defaultValue={new Date(data.eventDate).toISOString().slice(0, 10)}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
