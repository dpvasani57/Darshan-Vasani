import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Level8Page1 from '../level8/Level8Page1';
import Level8Page2 from '../level8/Level8Page2';
import Level8Page3 from '../level8/Level8Page3';
import Level8Page4 from '../level8/Level8Page4';
import Level8Page5 from '../level8/Level8Page5';
import Level8Page6 from '../level8/Level8Page6';
import Level8Page7 from '../level8/Level8Page7';
import Level8Page8 from '../level8/Level8Page8';
import Level8Page9 from '../level8/Level8Page9';
import Level8Page10 from '../level8/Level8Page10';

const LevelMain8 = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">Level 8</span>
          Navigation
        </h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page) => (
            <Link
              key={page}
              to={`Level8Page${page}`}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentPage === `Level8Page${page}`
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
          <Route path="/" element={<Navigate to="Level8Page1" />} />
          <Route path="Level8Page1" element={<Level8Page1 />} />
          <Route path="Level8Page2" element={<Level8Page2 />} />
          <Route path="Level8Page3" element={<Level8Page3 />} />
          <Route path="Level8Page4" element={<Level8Page4 />} />
          <Route path="Level8Page5" element={<Level8Page5 />} />
          <Route path="Level8Page6" element={<Level8Page6 />} />
          <Route path="Level8Page7" element={<Level8Page7 />} />
          <Route path="Level8Page8" element={<Level8Page8 />} />
          <Route path="Level8Page9" element={<Level8Page9 />} />
          <Route path="Level8Page10" element={<Level8Page10 />} />
        </Routes>
      </div>
    </div>
  );
};

export default LevelMain8;
