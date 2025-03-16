import { FaPlane, FaHotel, FaUtensils, FaMapMarkerAlt } from 'react-icons/fa';

export default function Dashboard() {
  // Sample data - replace with real data from your backend
  const upcomingTrip = {
    destination: 'Paris, France',
    dates: 'Dec 15 - Dec 22, 2024',
    weather: '12°C, Partly Cloudy',
    activities: [
      { id: 1, time: '09:00 AM', activity: 'Eiffel Tower Visit', location: 'Champ de Mars' },
      { id: 2, time: '12:30 PM', activity: 'Lunch at Le Jules Verne', location: 'Eiffel Tower' },
      { id: 3, time: '03:00 PM', activity: 'Louvre Museum Tour', location: 'Rue de Rivoli' },
    ],
  };

  const stats = [
    { id: 1, name: 'Total Trips', value: '12', icon: FaPlane },
    { id: 2, name: 'Hotels Booked', value: '8', icon: FaHotel },
    { id: 3, name: 'Restaurants Visited', value: '24', icon: FaUtensils },
    { id: 4, name: 'Places Explored', value: '36', icon: FaMapMarkerAlt },
  ];

  return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Traveler! 👋</h1>
          <p className="mt-1 text-gray-500">Here's what's happening with your travels.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">{stat.value}</h2>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Trip */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Trip</h2>
            <div className="mt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{upcomingTrip.destination}</h3>
                  <p className="text-gray-500">{upcomingTrip.dates}</p>
                  <p className="text-sm text-gray-500 mt-1">{upcomingTrip.weather}</p>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
              <div className="space-y-4">
                {upcomingTrip.activities.map((activity) => (
                  <div key={activity.id} className="flex items-start">
                    <div className="flex-shrink-0 w-20 text-sm text-gray-500">
                      {activity.time}
                    </div>
                    <div className="flex-1 ml-4">
                      <p className="text-gray-900 font-medium">{activity.activity}</p>
                      <p className="text-sm text-gray-500">{activity.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trips */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Trips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 1, destination: 'Rome, Italy', date: 'Nov 2023', image: 'https://source.unsplash.com/400x300/?rome' },
              { id: 2, destination: 'Tokyo, Japan', date: 'Oct 2023', image: 'https://source.unsplash.com/400x300/?tokyo' },
              { id: 3, destination: 'New York, USA', date: 'Sep 2023', image: 'https://source.unsplash.com/400x300/?newyork' },
            ].map((trip) => (
              <div key={trip.id} className="relative rounded-lg overflow-hidden group">
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4 opacity-100 group-hover:opacity-100 transition-opacity">
                  <div className="text-white">
                    <h3 className="font-semibold">{trip.destination}</h3>
                    <p className="text-sm">{trip.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
} 