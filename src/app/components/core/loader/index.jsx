import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <div className="relative w-60 h-48 flex justify-center items-center animate-wobble">
        {/* Skeleton Effect */}
        <div className="absolute inset-0 bg-gray-300 animate-skeleton rounded-lg w-full"></div>
        
        {/* Logo */}
        <img
          src="/logo/logo-black.png" // Ensure the logo is in the 'public' folder
          alt="Vasthra Logo"
          className="w-40 h-auto animate-fade-glow relative z-10"
        />
      </div>

      {/* Creative Loading Text */}
      <div className="mt-4 text-lg font-semibold text-gray-600 animate-typing">
        L<span className="delay-100">o</span>
        <span className="delay-200">a</span>
        <span className="delay-300">d</span>
        <span className="delay-400">i</span>
        <span className="delay-500">n</span>
        <span className="delay-600">g</span>
        <span className="delay-700">.</span>
        <span className="delay-800">.</span>
        <span className="delay-900">.</span>
      </div>

      <style>
        {`
          /* Skeleton Loading Effect */
          @keyframes skeleton {
            0% { background-position: -200px 0; }
            100% { background-position: 200px 0; }
          }
          .animate-skeleton {
            background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
            background-size: 400% 100%;
            animation: skeleton 1.5s infinite linear;
          }

          /* Fade Glow Animation */
          @keyframes fade-glow {
            0% { opacity: 0.5; filter: drop-shadow(0 0 5px #ddd); }
            100% { opacity: 1; filter: drop-shadow(0 0 10px #bbb); }
          }
          .animate-fade-glow {
            animation: fade-glow 2s infinite alternate ease-in-out;
          }

          /* Wobble Effect */
          @keyframes wobble {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(1.5deg); }
            50% { transform: rotate(-1.5deg); }
            75% { transform: rotate(1deg); }
          }
          .animate-wobble {
            animation: wobble 2s infinite ease-in-out;
          }

          /* Typing Effect for Loading Text */
          @keyframes typing {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-typing span {
            display: inline-block;
            opacity: 0;
            animation: typing 1s forwards;
          }
          .animate-typing .delay-100 { animation-delay: 0.1s; }
          .animate-typing .delay-200 { animation-delay: 0.2s; }
          .animate-typing .delay-300 { animation-delay: 0.3s; }
          .animate-typing .delay-400 { animation-delay: 0.4s; }
          .animate-typing .delay-500 { animation-delay: 0.5s; }
          .animate-typing .delay-600 { animation-delay: 0.6s; }
          .animate-typing .delay-700 { animation-delay: 0.7s; }
          .animate-typing .delay-800 { animation-delay: 0.8s; }
          .animate-typing .delay-900 { animation-delay: 0.9s; }
        `}
      </style>
    </div>
  );
};

export default Loader;
