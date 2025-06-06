import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-xl z-50">
      <div className="w-full px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-bold bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm">
            Current: {currentPath.split('/').pop()}
          </div>
          <nav className="flex flex-wrap justify-center gap-2">
            {levels.map((level) => (
              <Link
                key={level}
                to={`/levelMain${level}`}
                className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  currentPath.includes(`levelMain${level}`)
                    ? 'bg-white text-purple-600 font-bold shadow-lg'
                    : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                Level {level}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation; 