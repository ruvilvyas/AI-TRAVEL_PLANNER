"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaHome, FaSuitcase, FaMapMarkedAlt, FaWallet, FaUser, FaBell } from "react-icons/fa";
import Link from "next/link";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [notifications] = useState([
    { id: 1, text: "Your Paris trip starts in 3 days!" },
    { id: 2, text: "Hotel booking confirmed for Rome" },
  ]);

  const pathname = usePathname();

  // Function to dynamically assign active class
  const isActive = (path: string) =>
    pathname === path
      ? "border-indigo-500 text-gray-900"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer">
                <span className="text-2xl font-bold text-indigo-600">✈️</span>
                <span className="ml-2 text-xl font-semibold">Travel Planner</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/dashboard" className={`${isActive("/dashboard")} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  <FaHome className="mr-2" />
                  Dashboard
                </Link>
                <Link href="/trips" className={`${isActive("/trips")} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  <FaSuitcase className="mr-2" />
                  My Trips
                </Link>
                <Link href="/explore" className={`${isActive("/explore")} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  <FaMapMarkedAlt className="mr-2" />
                  Explore
                </Link>
                <Link href="/expenses" className={`${isActive("/expenses")} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  <FaWallet className="mr-2" />
                  Expenses
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {/* Notifications */}
              <div className="relative ml-3">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                  <FaBell className="h-6 w-6" />
                </button>
              </div>
              {/* Profile */}
              <Link href="/login">
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  <FaUser className="h-6 w-6" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="sm:hidden fixed bottom-0 w-full bg-white border-t">
        <div className="flex justify-around py-3">
          <Link href="/dashboardLayout" className={`${isActive("/dashboard")} flex flex-col items-center text-xs`}>
            <FaHome className="h-6 w-6" />
            <span>Home</span>
          </Link>
          <Link href="/trips" className={`${isActive("/trips")} flex flex-col items-center text-xs`}>
            <FaSuitcase className="h-6 w-6" />
            <span>Trips</span>
          </Link>
          <Link href="/explore" className={`${isActive("/explore")} flex flex-col items-center text-xs`}>
            <FaMapMarkedAlt className="h-6 w-6" />
            <span>Explore</span>
          </Link>
          <Link href="/expenses" className={`${isActive("/expenses")} flex flex-col items-center text-xs`}>
            <FaWallet className="h-6 w-6" />
            <span>Expenses</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
