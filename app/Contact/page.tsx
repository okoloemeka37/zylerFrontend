import React from "react";

const ContactPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-white">Contact Us</h1>
        <p className="mt-4 text-lg text-indigo-200">
          We&apos;d love to hear from you! Feel free to reach out to us with any questions.
        </p>
      </div>

      {/* Contact Information & Form */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
            <p className="text-gray-600">
              Feel free to reach out via email, phone, or visit us at our location.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16.5 8.25a6.375 6.375 0 00-12.75 0c0 4.125 3.2 6.6 6.375 9.225C13.275 14.85 16.5 12.375 16.5 8.25z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.25 12h.008v.008H8.25z"
                  />
                </svg>
                <p className="ml-3 text-gray-600">1234 Main Street, Anytown, USA</p>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.75 9V5.25m0 0H12m3.75 0V9m0 0v3.75m-3.75 0h3.75M12 15.75h3.75M9 15.75H5.25m0 0V9m0 6.75H9m0 0v3.75m0-3.75H5.25"
                  />
                </svg>
                <p className="ml-3 text-gray-600">contact@company.com</p>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.75 9V5.25m0 0H12m3.75 0V9m0 0v3.75m-3.75 0h3.75M12 15.75h3.75M9 15.75H5.25m0 0V9m0 6.75H9m0 0v3.75m0-3.75H5.25"
                  />
                </svg>
                <p className="ml-3 text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Send a Message</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Write your message..."
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
