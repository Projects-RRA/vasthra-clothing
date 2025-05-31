"use client";
export const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8 text-center">
      <img
        src="/images/fallBackImage.png" // Use a fun illustration (e.g., empty box, magnifying glass)
        alt="No Product Found"
        className="h-64 mb-6"
      />
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Page not found
      </h1>
      <p className="text-gray-600 mb-6">
        The page you're looking for is unavailable.
      </p>
      <div className="flex gap-4">
        <a
          href="/"
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Back to Home
        </a>
        <a
          href="/categories"
          className="border border-black text-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
        >
          Browse Products
        </a>
      </div>
    </div>
  );
};
