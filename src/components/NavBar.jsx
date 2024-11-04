import { NavLink, Route, Routes } from "react-router-dom";
import { Pat } from "../views/Pat/Pat.jsx";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <NavLink to="/pat">МДК</NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="*" element={<Pat />} />
        <Route path="/pat" element={<Pat />} />
      </Routes>
    </div>
  );
};

export { NavBar };
