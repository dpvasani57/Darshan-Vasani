import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Level10Page1 from '../level10/Level10Page1';
import Level10Page2 from '../level10/Level10Page2';
import Level10Page3 from '../level10/Level10Page3';
import Level10Page4 from '../level10/Level10Page4';
import Level10Page5 from '../level10/Level10Page5';
import Level10Page6 from '../level10/Level10Page6';
import Level10Page7 from '../level10/Level10Page7';
import Level10Page8 from '../level10/Level10Page8';
import Level10Page9 from '../level10/Level10Page9';
import Level10Page10 from '../level10/Level10Page10';

const LevelMain10 = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">Level 10</span>
          Navigation
        </h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page) => (
            <Link
              key={page}
              to={`Level10Page${page}`}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentPage === `Level10Page${page}`
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
          <Route path="/" element={<Navigate to="Level10Page1" />} />
          <Route path="Level10Page1" element={<Level10Page1 />} />
          <Route path="Level10Page2" element={<Level10Page2 />} />
          <Route path="Level10Page3" element={<Level10Page3 />} />
          <Route path="Level10Page4" element={<Level10Page4 />} />
          <Route path="Level10Page5" element={<Level10Page5 />} />
          <Route path="Level10Page6" element={<Level10Page6 />} />
          <Route path="Level10Page7" element={<Level10Page7 />} />
          <Route path="Level10Page8" element={<Level10Page8 />} />
          <Route path="Level10Page9" element={<Level10Page9 />} />
          <Route path="Level10Page10" element={<Level10Page10 />} />
        </Routes>
      </div>
    </div>
  );
};

export default LevelMain10;
