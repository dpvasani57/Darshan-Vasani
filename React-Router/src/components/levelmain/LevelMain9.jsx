import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Level9Page1 from '../level9/Level9Page1';
import Level9Page2 from '../level9/Level9Page2';
import Level9Page3 from '../level9/Level9Page3';
import Level9Page4 from '../level9/Level9Page4';
import Level9Page5 from '../level9/Level9Page5';
import Level9Page6 from '../level9/Level9Page6';
import Level9Page7 from '../level9/Level9Page7';
import Level9Page8 from '../level9/Level9Page8';
import Level9Page9 from '../level9/Level9Page9';
import Level9Page10 from '../level9/Level9Page10';

const LevelMain9 = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();

  const pages = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-lg border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-purple-800 flex items-center gap-2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-lg">Level 9</span>
          Navigation
        </h2>
        <div className="flex flex-wrap gap-3">
          {pages.map((page) => (
            <Link
              key={page}
              to={`Level9Page${page}`}
              className={`px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentPage === `Level9Page${page}`
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
          <Route path="/" element={<Navigate to="Level9Page1" />} />
          <Route path="Level9Page1" element={<Level9Page1 />} />
          <Route path="Level9Page2" element={<Level9Page2 />} />
          <Route path="Level9Page3" element={<Level9Page3 />} />
          <Route path="Level9Page4" element={<Level9Page4 />} />
          <Route path="Level9Page5" element={<Level9Page5 />} />
          <Route path="Level9Page6" element={<Level9Page6 />} />
          <Route path="Level9Page7" element={<Level9Page7 />} />
          <Route path="Level9Page8" element={<Level9Page8 />} />
          <Route path="Level9Page9" element={<Level9Page9 />} />
          <Route path="Level9Page10" element={<Level9Page10 />} />
        </Routes>
      </div>
    </div>
  );
};

export default LevelMain9;
