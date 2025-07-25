import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Level1Page1 from '../level1/Level1Page1';
import Level1Page2 from '../level1/Level1Page2';
import Level1Page3 from '../level1/Level1Page3';
import Level1Page4 from '../level1/Level1Page4';
import Level1Page5 from '../level1/Level1Page5';
import Level1Page6 from '../level1/Level1Page6';
import Level1Page7 from '../level1/Level1Page7';
import Level1Page8 from '../level1/Level1Page8';
import Level1Page9 from '../level1/Level1Page9';
import Level1Page10 from '../level1/Level1Page10';

const LevelMain1 = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">Level 1</span>
          Navigation
        </h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page) => (
            <Link
              key={page}
              to={`Level1Page${page}`}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentPage === `Level1Page${page}`
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
          <Route path="/" element={<Navigate to="Level1Page1" />} />
          <Route path="Level1Page1" element={<Level1Page1 />} />
          <Route path="Level1Page2" element={<Level1Page2 />} />
          <Route path="Level1Page3" element={<Level1Page3 />} />
          <Route path="Level1Page4" element={<Level1Page4 />} />
          <Route path="Level1Page5" element={<Level1Page5 />} />
          <Route path="Level1Page6" element={<Level1Page6 />} />
          <Route path="Level1Page7" element={<Level1Page7 />} />
          <Route path="Level1Page8" element={<Level1Page8 />} />
          <Route path="Level1Page9" element={<Level1Page9 />} />
          <Route path="Level1Page10" element={<Level1Page10 />} />
        </Routes>
      </div>
    </div>
  );
};

export default LevelMain1;
