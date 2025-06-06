import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Level4Page1 from '../level4/Level4Page1';
import Level4Page2 from '../level4/Level4Page2';
import Level4Page3 from '../level4/Level4Page3';
import Level4Page4 from '../level4/Level4Page4';
import Level4Page5 from '../level4/Level4Page5';
import Level4Page6 from '../level4/Level4Page6';
import Level4Page7 from '../level4/Level4Page7';
import Level4Page8 from '../level4/Level4Page8';
import Level4Page9 from '../level4/Level4Page9';
import Level4Page10 from '../level4/Level4Page10';

const LevelMain4 = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">Level 4</span>
          Navigation
        </h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page) => (
            <Link
              key={page}
              to={`Level4Page${page}`}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentPage === `Level4Page${page}`
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
          <Route path="/" element={<Navigate to="Level4Page1" />} />
          <Route path="Level4Page1" element={<Level4Page1 />} />
          <Route path="Level4Page2" element={<Level4Page2 />} />
          <Route path="Level4Page3" element={<Level4Page3 />} />
          <Route path="Level4Page4" element={<Level4Page4 />} />
          <Route path="Level4Page5" element={<Level4Page5 />} />
          <Route path="Level4Page6" element={<Level4Page6 />} />
          <Route path="Level4Page7" element={<Level4Page7 />} />
          <Route path="Level4Page8" element={<Level4Page8 />} />
          <Route path="Level4Page9" element={<Level4Page9 />} />
          <Route path="Level4Page10" element={<Level4Page10 />} />
        </Routes>
      </div>
    </div>
  );
};

export default LevelMain4;
