import React, { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from 'react-icons/fa';

const iconMap = {
  success: <FaCheckCircle className="text-green-400 text-xl" />,
  error: <FaTimesCircle className="text-red-400 text-xl" />,
  warning: <FaExclamationTriangle className="text-yellow-400 text-xl" />,
  info: <FaInfoCircle className="text-blue-400 text-xl" />,
};

const Toast = ({
  id,
  title,
  description,
  status = 'info',
  duration = 5000,
  position = 'top-right',
  isClosable = true,
  onClose,
}) => {
  const [progress, setProgress] = useState(100);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percentLeft = 100 - (elapsed / duration) * 100;
      setProgress(percentLeft);
    }, 50);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setVisible(false);
      onClose?.(id);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, id, onClose]);

  if (!visible) return null;

  const positionClass = {
    'top-right': 'top-5 right-5',
    'top-left': 'top-5 left-5',
    'bottom-right': 'bottom-5 right-5',
    'bottom-left': 'bottom-5 left-5',
    'top-center': 'top-5 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2',
  }[position] || 'top-5 right-5';

  return (
    <div
      className={`fixed z-50 max-w-sm w-full p-4 rounded-xl text-white transition-all
        ${positionClass}
        bg-gray-800 shadow-2xl ring-1 ring-white/10`}
    >
      <div className="flex items-start gap-3">
        {iconMap[status]}
        <div className="flex-1">
          <h4 className="font-semibold">{title}</h4>
          {description && <p className="text-sm opacity-90">{description}</p>}
        </div>
        {isClosable && (
          <button
            className="text-xl font-bold hover:opacity-70"
            onClick={() => {
              setVisible(false);
              onClose?.(id);
            }}
          >
            ×
          </button>
        )}
      </div>
      <div className="h-1 mt-3 w-full bg-white/20 rounded overflow-hidden">
        <div
          className={`h-full transition-all duration-100 ease-linear ${
            status === 'success'
              ? 'bg-green-400'
              : status === 'error'
              ? 'bg-red-400'
              : status === 'warning'
              ? 'bg-yellow-400'
              : 'bg-blue-400'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;
