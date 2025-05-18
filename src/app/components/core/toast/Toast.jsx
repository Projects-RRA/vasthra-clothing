/**
 * Toast Component
 * 
 * Props:
 * - title (string): The title of the toast.
 * - description (string): Additional message in the toast.
 * - status (string): "success" | "error" | "warning" (default: "success").
 * - duration (number): Auto-close duration in milliseconds (default: 5000).
 * - isClosable (boolean): If `true`, a close button is shown (default: true).
 * - position (string): Defines where the toast appears.
 *    - "top-left"
 *    - "top-center"
 *    - "top-right"
 *    - "bottom-left"
 *    - "bottom-center"
 *    - "bottom-right"
 */
import React, { useEffect, useState } from "react";

const Toast = ({
  title = "",
  description = "",
  status = "success",
  duration = 5000,
  isClosable = true,
  position = "top-right",
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!visible) return null;

  const statusStyles = {
    success: {
      icon: (
        <svg
          className="w-5 h-5 SUcceSS Toat"
          xmlns="http://www.w3.org/2000/svg"
          fill="green"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      ),
      color: "text-green-500 bg-green-100",
    },
    error: {
      icon: (
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
      ),
      color: "text-red-500 bg-red-100",
    },
    warning: {
      icon: (
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
        </svg>
      ),
      color: "text-orange-500 bg-orange-100",
    },
  };

  const { icon, color } = statusStyles[status] || statusStyles.success;
  const positionStyle = {
    top: position.includes("top") ? "1rem" : "auto",
    bottom: position.includes("bottom") ? "1rem" : "auto",
    left: position.includes("center")
      ? "50%"
      : position.includes("left")
      ? "1rem"
      : "auto",
    right: position.includes("right") ? "1rem" : "auto",
    transform: position.includes("center") ? "translateX(-50%)" : "none",
  };

  return (
    <div
      className={`fixed flex items-center z-50 w-full max-w-xs p-4 mb-4 rounded-lg shadow ${color} CustomToast`}
      style={positionStyle}
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg `}
      >
        {icon}
        <span className="sr-only">{status} icon</span>
      </div>
      <div className="ml-3 text-sm font-normal">
        <strong>{title}</strong>
        <div>{description}</div>
      </div>
      {isClosable && (
        <button
          type="button"
          className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5  inline-flex items-center justify-center h-8 w-8 hover:text-black ${color}`}
          onClick={() => setVisible(false)}
          aria-label="Close"
        >
          <svg
            className="w-3 h-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Toast;
