"use client";
import { useState } from 'react';
import { FaMoneyBillWave, FaPlane, FaHotel, FaUtensils, FaTicketAlt } from 'react-icons/fa';

export default function Expenses() {
  const [timeframe, setTimeframe] = useState('month');

  // Sample data - replace with real data from your backend
  const expenses = {
    total: 12500,
    categories: [
      { name: 'Transportation', amount: 3500, icon: FaPlane, color: 'bg-blue-500' },
      { name: 'Accommodation', amount: 4000, icon: FaHotel, color: 'bg-green-500' },
      { name: 'Food & Dining', amount: 2500, icon: FaUtensils, color: 'bg-yellow-500' },
      { name: 'Activities', amount: 2500, icon: FaTicketAlt, color: 'bg-purple-500' },
    ],
    transactions: [
      {
        id: 1,
        description: 'Hotel Booking - Paris Hilton',
        amount: 1200,
        date: '2023-12-01',
        category: 'Accommodation',
      },
      {
        id: 2,
        description: 'Flight Tickets - Air France',
        amount: 800,
        date: '2023-12-02',
        category: 'Transportation',
      },
      {
        id: 3,
        description: 'Eiffel Tower Tour',
        amount: 75,
        date: '2023-12-15',
        category: 'Activities',
      },
    ],
  };

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Expenses Tracker</h1>
          <div className="flex items-center space-x-4">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Add Expense
            </button>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <h2 className="text-3xl font-bold text-gray-900">${expenses.total.toLocaleString()}</h2>
            </div>
            <div className="p-4 bg-indigo-100 rounded-full">
              <FaMoneyBillWave className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {expenses.categories.map((category) => (
            <div key={category.name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${category.color} bg-opacity-20`}>
                  <category.icon className={`h-6 w-6 ${category.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-sm font-medium text-gray-500">{category.name}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${category.amount.toLocaleString()}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {Math.round((category.amount / expenses.total) * 100)}% of total
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {expenses.transactions.map((transaction) => (
              <div key={transaction.id} className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="font-medium text-gray-900">
                    ${transaction.amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50">
            <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
              View All Transactions →
            </button>
          </div>
        </div>
      </div>
  );
} 