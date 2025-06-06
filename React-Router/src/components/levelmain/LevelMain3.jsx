import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Level3Page1 from '../level3/Level3Page1';
import Level3Page2 from '../level3/Level3Page2';
import Level3Page3 from '../level3/Level3Page3';
import Level3Page4 from '../level3/Level3Page4';
import Level3Page5 from '../level3/Level3Page5';
import Level3Page6 from '../level3/Level3Page6';
import Level3Page7 from '../level3/Level3Page7';
import Level3Page8 from '../level3/Level3Page8';
import Level3Page9 from '../level3/Level3Page9';
import Level3Page10 from '../level3/Level3Page10';

const LevelMain3 = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">Level 3</span>
          Navigation
        </h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page) => (
            <Link
              key={page}
              to={`Level3Page${page}`}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentPage === `Level3Page${page}`
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
          <Route path="/" element={<Navigate to="Level3Page1" />} />
          <Route path="Level3Page1" element={<Level3Page1 />} />
          <Route path="Level3Page2" element={<Level3Page2 />} />
          <Route path="Level3Page3" element={<Level3Page3 />} />
          <Route path="Level3Page4" element={<Level3Page4 />} />
          <Route path="Level3Page5" element={<Level3Page5 />} />
          <Route path="Level3Page6" element={<Level3Page6 />} />
          <Route path="Level3Page7" element={<Level3Page7 />} />
          <Route path="Level3Page8" element={<Level3Page8 />} />
          <Route path="Level3Page9" element={<Level3Page9 />} />
          <Route path="Level3Page10" element={<Level3Page10 />} />
        </Routes>
      </div>
    </div>
  );
};

export default LevelMain3;
