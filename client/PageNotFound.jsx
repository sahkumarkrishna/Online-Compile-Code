import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./src/components/Loading";

const PageNotFound = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1 second (1000ms)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-800 px-4">
      <img
        src="/pageNot.png"
        alt="404 Not Found"
        className="w-full max-w-md mb-8"
      />

      <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
        Page Not Found
      </h1>

      <p className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        Sorry, the page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="inline-block text-black font-semibold px-6 py-2 rounded-full text-xl"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
