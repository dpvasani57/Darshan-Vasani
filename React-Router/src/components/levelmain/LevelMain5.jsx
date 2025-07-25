import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Level5Page1 from '../level5/Level5Page1';
import Level5Page2 from '../level5/Level5Page2';
import Level5Page3 from '../level5/Level5Page3';
import Level5Page4 from '../level5/Level5Page4';
import Level5Page5 from '../level5/Level5Page5';
import Level5Page6 from '../level5/Level5Page6';
import Level5Page7 from '../level5/Level5Page7';
import Level5Page8 from '../level5/Level5Page8';
import Level5Page9 from '../level5/Level5Page9';
import Level5Page10 from '../level5/Level5Page10';

const LevelMain5 = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">Level 5</span>
          Navigation
        </h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page) => (
            <Link
              key={page}
              to={`Level5Page${page}`}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentPage === `Level5Page${page}`
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
          <Route path="/" element={<Navigate to="Level5Page1" />} />
          <Route path="Level5Page1" element={<Level5Page1 />} />
          <Route path="Level5Page2" element={<Level5Page2 />} />
          <Route path="Level5Page3" element={<Level5Page3 />} />
          <Route path="Level5Page4" element={<Level5Page4 />} />
          <Route path="Level5Page5" element={<Level5Page5 />} />
          <Route path="Level5Page6" element={<Level5Page6 />} />
          <Route path="Level5Page7" element={<Level5Page7 />} />
          <Route path="Level5Page8" element={<Level5Page8 />} />
          <Route path="Level5Page9" element={<Level5Page9 />} />
          <Route path="Level5Page10" element={<Level5Page10 />} />
        </Routes>
      </div>
    </div>
  );
};

export default LevelMain5;
