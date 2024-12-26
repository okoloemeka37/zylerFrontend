'use client'

import React, { useState } from "react";
import { HiOutlineClock, HiOutlineSearch } from "react-icons/hi";

const UserActivitiesPage = ({  }) => {
    const [activities, setactivities] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  const filteredActivities = activities.filter((activity) =>
    activity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
          <h1 className="text-2xl font-bold">User Activities</h1>
          <div className="flex items-center bg-white text-gray-800 px-3 py-2 rounded-lg">
            <HiOutlineSearch className="text-lg mr-2" />
            <input
              type="text"
              placeholder="Search activities"
              className="focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Activity List */}
        <div className="divide-y divide-gray-200">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition duration-300"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {activity.description}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
                <HiOutlineClock className="text-gray-400 text-2xl" />
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-gray-500">
              <p>No activities found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserActivitiesPage;
