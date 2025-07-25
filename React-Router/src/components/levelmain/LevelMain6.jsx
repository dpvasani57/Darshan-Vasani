import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Level6Page1 from '../level6/Level6Page1';
import Level6Page2 from '../level6/Level6Page2';
import Level6Page3 from '../level6/Level6Page3';
import Level6Page4 from '../level6/Level6Page4';
import Level6Page5 from '../level6/Level6Page5';
import Level6Page6 from '../level6/Level6Page6';
import Level6Page7 from '../level6/Level6Page7';
import Level6Page8 from '../level6/Level6Page8';
import Level6Page9 from '../level6/Level6Page9';
import Level6Page10 from '../level6/Level6Page10';

const LevelMain6 = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">Level 6</span>
          Navigation
        </h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page) => (
            <Link
              key={page}
              to={`Level6Page${page}`}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentPage === `Level6Page${page}`
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
          <Route path="/" element={<Navigate to="Level6Page1" />} />
          <Route path="Level6Page1" element={<Level6Page1 />} />
          <Route path="Level6Page2" element={<Level6Page2 />} />
          <Route path="Level6Page3" element={<Level6Page3 />} />
          <Route path="Level6Page4" element={<Level6Page4 />} />
          <Route path="Level6Page5" element={<Level6Page5 />} />
          <Route path="Level6Page6" element={<Level6Page6 />} />
          <Route path="Level6Page7" element={<Level6Page7 />} />
          <Route path="Level6Page8" element={<Level6Page8 />} />
          <Route path="Level6Page9" element={<Level6Page9 />} />
          <Route path="Level6Page10" element={<Level6Page10 />} />
        </Routes>
      </div>
    </div>
  );
};

export default LevelMain6;
