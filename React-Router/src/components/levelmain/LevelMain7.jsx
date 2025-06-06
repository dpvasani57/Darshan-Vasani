import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Level7Page1 from '../level7/Level7Page1';
import Level7Page2 from '../level7/Level7Page2';
import Level7Page3 from '../level7/Level7Page3';
import Level7Page4 from '../level7/Level7Page4';
import Level7Page5 from '../level7/Level7Page5';
import Level7Page6 from '../level7/Level7Page6';
import Level7Page7 from '../level7/Level7Page7';
import Level7Page8 from '../level7/Level7Page8';
import Level7Page9 from '../level7/Level7Page9';
import Level7Page10 from '../level7/Level7Page10';

const LevelMain7 = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">Level 7</span>
          Navigation
        </h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page) => (
            <Link
              key={page}
              to={`Level7Page${page}`}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentPage === `Level7Page${page}`
                  ? 'bg-purple-600 text-white font-bold shadow-lg'
                  : 'bg-white hover:bg-purple-50 text-purple-600 border border-purple-200'
              }`}
            >
              Page {page}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <Routes>
          <Route path="/" element={<Navigate to="Level7Page1" />} />
          <Route path="Level7Page1" element={<Level7Page1 />} />
          <Route path="Level7Page2" element={<Level7Page2 />} />
          <Route path="Level7Page3" element={<Level7Page3 />} />
          <Route path="Level7Page4" element={<Level7Page4 />} />
          <Route path="Level7Page5" element={<Level7Page5 />} />
          <Route path="Level7Page6" element={<Level7Page6 />} />
          <Route path="Level7Page7" element={<Level7Page7 />} />
          <Route path="Level7Page8" element={<Level7Page8 />} />
          <Route path="Level7Page9" element={<Level7Page9 />} />
          <Route path="Level7Page10" element={<Level7Page10 />} />
        </Routes>
      </div>
    </div>
  );
};

export default LevelMain7;
