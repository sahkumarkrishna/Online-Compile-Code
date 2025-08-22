import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-green-100 pt-12 pb-6 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-2xl font-bold text-green-600">CodeCompiler</h3>
            <p className="text-sm text-black mt-2">
              The fastest way to run and preview code online.
            </p>
          </div>

          {/* Column 2 - Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-green-700">Contact Us</h4>
            <p className="text-sm mb-2 text-black">
              Email: <span className="font-medium">kumarkrishna9801552@gmail.com</span>
            </p>
            <div className="flex space-x-4 mt-4">
              <Link to="#" className="text-black hover:text-green-700 transition">
                <FaFacebookF />
              </Link>
              <Link to="#" className="text-black hover:text-green-700 transition">
                <FaTwitter />
              </Link>
              <Link to="#" className="text-black hover:text-green-700 transition">
                <FaInstagram />
              </Link>
              <Link to="#" className="text-black hover:text-green-700 transition">
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-10 border-t border-gray-300 pt-4 text-center text-sm text-black">
          <p>
            &copy; 2025 <span className="font-semibold">CodeCompiler</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;
