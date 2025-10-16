import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
      {/* GIF + 404 */}
      <div className="relative flex justify-center items-center">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 Not Found"
          className="w-full max-w-md h-auto"
        />
        <h1 className="absolute text-6xl sm:text-8xl font-extrabold text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          404
        </h1>
      </div>

      {/* Message */}
      <div className="text-center mt-6 sm:mt-10">
        <h3 className="text-2xl sm:text-4xl font-semibold mb-2 text-gray-800">
          Looks like you're lost
        </h3>
        <p className="text-gray-600 mb-6">
          The page you are looking for is not available!
        </p>

        {/* Home Button */}
        <Link
          to="/"
          className="inline-block bg-green-400 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 text-lg"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
