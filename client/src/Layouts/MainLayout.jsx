import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500">
        © 2025 My App. All rights reserved.
      </footer>
    </div>
  );
}

export default MainLayout;
