import React from "react";
import { Link } from "react-router-dom";
import { Menu, Code, Bug, Users } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      {/* Sidebar */}
      <aside className="w-full md:w-64  shadow-lg px-6 py-8">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-12 tracking-wide">CompileCode</h1>
        <nav className="space-y-3 flex md:block justify-around md:justify-start">
         
          <SidebarLink to="/users" icon={<Users size={20} />} label="Users" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Dashboard</h2>
         
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Compilations" value="1,240" />
          <StatCard title="Successful Builds" value="1,180" textColor="text-green-600" />
          <StatCard title="Build Errors" value="60" textColor="text-red-600" />
          <StatCard title="Active Users" value="342" />
        </div>

        {/* Recent Compilations */}
        <section>
          <h4 className="text-xl font-semibold mb-5 text-gray-800">Recent Compilations</h4>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <ul className="divide-y divide-gray-200 text-base">
              <CompilationItem file="main.cpp compiled" status="Success" />
              <CompilationItem file="App.java compiled" status="Error" />
              <CompilationItem file="index.js compiled" status="Success" />
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

// Sidebar Link with hover bg and transition
const SidebarLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition duration-200 font-medium"
  >
    <span className="mr-3">{icon}</span>
    <span className="hidden md:inline">{label}</span>
  </Link>
);

// Stat Card with subtle shadow and spacing
const StatCard = ({ title, value, textColor = "text-gray-900" }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
    <p className="text-gray-500 font-semibold text-sm">{title}</p>
    <h3 className={`mt-2 text-2xl font-bold ${textColor}`}>{value}</h3>
  </div>
);

// Compilation Item with padding and smooth color transition
const CompilationItem = ({ file, status }) => {
  const isSuccess = status.toLowerCase() === "success";
  return (
    <li className="py-3 px-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 cursor-default">
      <span className="text-gray-700">{file}</span>
      <span
        className={`font-semibold ${isSuccess ? "text-green-600" : "text-red-600"}`}
      >
        {status}
      </span>
    </li>
  );
};

export default AdminDashboard;
