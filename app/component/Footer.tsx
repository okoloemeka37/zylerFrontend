import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const {BASE_URL}=useAuth()
    return (
      <footer className="bg-gray-800 text-white">
        {/* Top Section */}
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <p className="text-sm text-gray-400">
              Welcome to our store! We offer the best quality products to meet your needs. Your satisfaction is our priority.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="#" className="hover:underline text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-gray-400">
                  Shop
                </Link>
              </li>
              <li>
                <Link href={BASE_URL+"About"} className="hover:underline text-gray-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={BASE_URL+"Contact"} className="hover:underline text-gray-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
  
          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <p className="text-sm text-gray-400">
              Email: support@example.com
            </p>
            <p className="text-sm text-gray-400">
              Phone: +1 (234) 567-8901
            </p>
            <p className="text-sm text-gray-400">
              Address: 123 Main St, Anytown, USA
            </p>
          </div>
  
          {/* Social Media */}
          <div>
            <h2 className="text-lg font-bold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-700"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
  
        {/* Bottom Section */}
        <div className="bg-gray-900 text-center py-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Your Store Name. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  