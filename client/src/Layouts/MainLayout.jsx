import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-green-100 pt-12 pb-6 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-2xl font-bold text-green-500">CodeCompiler</h3>
            <p className="text-sm text-black mt-1">
              The fastest way to run and preview code online.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-green-500">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              
              <li>
                <Link to="/editor" className="hover:underline text-black">
                  Code Editor
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:underline text-black">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline text-black">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-green-700">
              Contact Us
            </h4>
            <p className="text-sm mb-2 text-black">
              Email:{" "}
              <span className="text-black">kumarkrishna9801552@gmail.com</span>
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-black hover:text-green-700 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-black hover:text-green-700 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-black hover:text-green-700 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-black hover:text-green-700 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-black">
          <p>
            &copy; 2025{" "}
            <span className="font-semibold text-black">CodeCompiler</span>. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
