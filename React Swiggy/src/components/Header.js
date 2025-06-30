import { LOGO_URL } from "../utils/constant";
import { useState, useContext } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import './RestaurentMenu.css';
import useOnlineStatus from '../utils/useOnlineStatus';
import { UserContext} from "../utils/UserContext";
import { useSelector } from "react-redux";


const Header = () => {
  const onlineStatus= useOnlineStatus();
  const { user, setUser } = useContext(UserContext);
  // Selector To Read Value From Store

  // Subscribing To The Store Using useSelector
  // This will re-render the component whenever the value of cart changes
  // useSelector is a hook that allows you to extract data from the Redux store state
  const items = useSelector((store) => store.cart.items || []);

  const handleAuth = () => {
    if (user) {
      setUser(null);
    } else {
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://i.pravatar.cc/40?img=3',
      });
    }
  };

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src={LOGO_URL} alt="App Logo" />
        </Link>
      </div>

      <div className="nav-items">
        <ul>
          <li className="px-6 py-3 text-white font-semibold text-sm rounded-full uppercase tracking-wide bg-white/15 border border-white/20 shadow-lg transition-all duration-300 transform hover:bg-white/25 hover:shadow-xl hover:-translate-y-1">Online Status: {onlineStatus ? "✅" : "🔴"}</li>
          <li>
            <NavLink to="/grocery" className={({ isActive }) => isActive ? "active" : ""}>Grocery</NavLink>
          </li>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>Cart- ({items.length})</NavLink>
          </li>
          <li>
            <button
              className={user ? "logout" : "login"}
              onClick={handleAuth}
            >
              {user ? "Logout" : "Login"}
            </button>
          </li>
        </ul> 
      </div>
    </div>
  );
};

export default Header;
