"use client";
import { useState } from 'react';
import Head from 'next/head';
import DashboardLayout from '../components/DashboardLayout';
import { FaShare, FaDownload } from 'react-icons/fa';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import toast, { Toaster } from 'react-hot-toast';
//import MapView from '../components/MapView';
//import WeatherForecast from '../components/WeatherForecast';
import ChatAssistant from '../components/ChatAssistant';

export default function Home() {
  const [formData, setFormData] = useState({
    destination: '',
    budget: '',
    startDate: '',
    endDate: '',
    interests: [''],
  });
  interface Itinerary {
    itinerary: any[]; // Replace 'any' with the actual type if known
  }

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInterestChange = (index: number, value: string) => {
    const newInterests = [...formData.interests];
    newInterests[index] = value;
    setFormData({ ...formData, interests: newInterests });
  };

  const addInterest = () => {
    setFormData({
      ...formData,
      interests: [...formData.interests, ''],
    });
  };

  const removeInterest = (index: number) => {
    const newInterests = formData.interests.filter((_, i) => i !== index);
    setFormData({ ...formData, interests: newInterests });
  };

  const validateBudget = (budget: string) => {
    const number = parseFloat(budget);
    return !isNaN(number) && number > 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    if (!validateBudget(formData.budget)) {
      setError('Please enter a valid budget amount');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          budget: Number(formData.budget),
          interests: formData.interests.filter((interest) => interest.trim() !== ''),
        }),
      });
  
      if (!response.ok) throw new Error('Failed to save itinerary');
  
      const data = await response.json();
      setItinerary(data);
      toast.success('Itinerary saved successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>AI Travel Planner</title>
          <meta name="description" content="AI-powered travel itinerary generator" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Plan Your Dream Trip
              </h1>
              <p className="text-gray-600">
                Let AI create a personalized travel itinerary just for you
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                  placeholder="e.g., Paris, France"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Daily Budget
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full p-2 pl-8 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    placeholder="e.g., 200"
                    pattern="[0-9]*"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Interests
                </label>
                {formData.interests.map((interest, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={interest}
                      onChange={(e) => handleInterestChange(index, e.target.value)}
                      className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., history, food, art"
                    />
                    {formData.interests.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInterest(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addInterest}
                  className="mt-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  + Add another interest
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors relative"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Itinerary...
                  </div>
                ) : (
                  'Generate Itinerary'
                )}
              </button>
            </form>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {itinerary && (
              <>
                <div className="flex justify-end space-x-4 mb-4">
                  <button
                    onClick={() => {
                      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                        JSON.stringify(itinerary, null, 2)
                      )}`;
                      const link = document.createElement('a');
                      link.href = jsonString;
                      link.download = 'travel-itinerary.json';
                      link.click();
                      toast.success('Itinerary downloaded successfully!');
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
                  >
                    <FaDownload />
                    <span>Download</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <TwitterShareButton
                      url={window.location.href}
                      title="Check out my travel itinerary!"
                      className="text-gray-600 hover:text-blue-400"
                    >
                      <FaShare />
                    </TwitterShareButton>
                    <FacebookShareButton
                      url={window.location.href}
                      hashtag="#TravelItinerary"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <FaShare />
                    </FacebookShareButton>
                  </div>
                </div>

{/*                <WeatherForecast
                  destination={formData.destination}
                  startDate={formData.startDate}
                />

                <MapView activities={itinerary.itinerary} />*/}
              </>
            )}
          </div>
        </main>

        <ChatAssistant />
        <Toaster position="bottom-center" />
      </div>
  );
} 