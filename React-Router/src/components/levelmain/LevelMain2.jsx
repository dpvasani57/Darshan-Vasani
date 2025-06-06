import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Level2Page1 from '../level2/Level2Page1';
import Level2Page2 from '../level2/Level2Page2';
import Level2Page3 from '../level2/Level2Page3';
import Level2Page4 from '../level2/Level2Page4';
import Level2Page5 from '../level2/Level2Page5';
import Level2Page6 from '../level2/Level2Page6';
import Level2Page7 from '../level2/Level2Page7';
import Level2Page8 from '../level2/Level2Page8';
import Level2Page9 from '../level2/Level2Page9';
import Level2Page10 from '../level2/Level2Page10';

const LevelMain2 = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">Level 2</span>
          Navigation
        </h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page) => (
            <Link
              key={page}
              to={`Level2Page${page}`}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentPage === `Level2Page${page}`
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
          <Route path="/" element={<Navigate to="Level2Page1" />} />
          <Route path="Level2Page1" element={<Level2Page1 />} />
          <Route path="Level2Page2" element={<Level2Page2 />} />
          <Route path="Level2Page3" element={<Level2Page3 />} />
          <Route path="Level2Page4" element={<Level2Page4 />} />
          <Route path="Level2Page5" element={<Level2Page5 />} />
          <Route path="Level2Page6" element={<Level2Page6 />} />
          <Route path="Level2Page7" element={<Level2Page7 />} />
          <Route path="Level2Page8" element={<Level2Page8 />} />
          <Route path="Level2Page9" element={<Level2Page9 />} />
          <Route path="Level2Page10" element={<Level2Page10 />} />
        </Routes>
      </div>
    </div>
  );
};

export default LevelMain2;
