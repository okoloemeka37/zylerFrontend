import React from 'react'

export default function Settings() {
  return (
    <div className="container mx-auto p-5">
  <header className="mb-6 bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-gray-800">Profile Settings</h2>
  </header>
  <form className="bg-white p-6 rounded-lg shadow-md space-y-6">
    {/* Personal Information */}
    <div>
      <h3 className="text-xl font-bold text-gray-700 mb-4">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-gray-600 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
           
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-600 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="johndoe@example.com"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
           
          />
        </div>
      </div>
    </div>
    {/* Change Password */}
    <div>
      <h3 className="text-xl font-bold text-gray-700 mb-4">Change Password</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="current-password"
            className="block text-gray-600 mb-2"
          >
            Current Password
          </label>
          <input
            type="password"
            id="current-password"
            placeholder="********"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
           
          />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-gray-600 mb-2">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            placeholder="********"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
           
          />
        </div>
      </div>
    </div>
    {/* Notification Settings */}
    <div>
      <h3 className="text-xl font-bold text-gray-700 mb-4">
        Notification Settings
      </h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="email-notifications"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="email-notifications" className="ml-2 text-gray-600">
            Email Notifications
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="sms-notifications"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="sms-notifications" className="ml-2 text-gray-600">
            SMS Notifications
          </label>
        </div>
      </div>
    </div>
    <div className="flex justify-end">
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Save Changes
      </button>
    </div>
  </form>
</div>

  )
}
