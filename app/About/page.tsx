'use client'
import React from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Image from 'next/image';



const About = () => { 
   const {BASE_URL}=useAuth()
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-600">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            About Us
          </h1>
          <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
            Discover our journey, our mission, and the people behind our success.
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
        <p className="text-gray-600 leading-relaxed">
          Founded in 2020, our company is dedicated to providing top-quality
          products and exceptional customer service. We started with a small
          team of passionate individuals and have grown into a vibrant
          community of like-minded people who believe in innovation,
          sustainability, and excellence.
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
            To inspire and empower individuals by offering products that
            enhance their lives and contribute to a better future. We are
            committed to sustainability and innovation in everything we do.
          </p>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "John Doe", role: "CEO", image: "/team1.jpg" },
            { name: "Jane Smith", role: "CTO", image: "/team2.jpg" },
            { name: "Alice Johnson", role: "COO", image: "/team3.jpg" },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 text-center"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-indigo-600 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Learn More?
          </h2>
          <p className="text-indigo-200 mb-6">
            Connect with us today to explore our products and services.
          </p>
          <Link href={BASE_URL+"Contact"} className="hover:underline text-gray-400">
                  Contact Us
                </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
