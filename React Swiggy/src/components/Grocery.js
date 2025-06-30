import React from 'react';
import { FaAppleAlt, FaCarrot, FaCheese, FaBreadSlice, FaTags } from 'react-icons/fa';

const categories = [
  { name: 'Fruits', icon: <FaAppleAlt className="text-red-500 text-3xl" /> },
  { name: 'Vegetables', icon: <FaCarrot className="text-orange-500 text-3xl" /> },
  { name: 'Dairy', icon: <FaCheese className="text-yellow-400 text-3xl" /> },
  { name: 'Bakery', icon: <FaBreadSlice className="text-yellow-700 text-3xl" /> },
];

const specials = [
  { title: '🍎 20% Off on Apples!', desc: 'Fresh and juicy apples, this week only.' },
  { title: '🥛 Buy 1 Get 1 Free Milk', desc: 'High-quality dairy for your family.' },
  { title: '🥖 Free Bread with Orders Over ₹500', desc: 'Enjoy our artisanal bread.' },
];

const Grocery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-pink-100 py-8 px-2">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-2 drop-shadow">Grocery Store 🛒</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-4">Your one-stop shop for fresh produce, dairy, and pantry staples.</p>
        <p className="text-md text-gray-500">Explore our wide selection of organic fruits and vegetables, high-quality meats, and artisanal bread. Don't forget to check out our weekly specials!</p>
      </div>

      {/* Categories */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {categories.map(cat => (
          <div key={cat.name} className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition-transform cursor-pointer border border-green-100">
            {cat.icon}
            <span className="mt-3 text-lg font-semibold text-gray-700">{cat.name}</span>
          </div>
        ))}
      </div>

      {/* Specials */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-400">
        <div className="flex items-center gap-2 mb-4 text-green-700 font-bold text-xl">
          <FaTags /> Weekly Specials
        </div>
        <ul className="space-y-4">
          {specials.map(s => (
            <li key={s.title} className="bg-green-50 rounded-lg p-4 border-l-4 border-green-300 shadow-sm">
              <div className="font-semibold text-lg">{s.title}</div>
              <div className="text-gray-600 text-sm">{s.desc}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Grocery;