import React from 'react';
import { NavLink } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      {/* Menu */}
      <ul className="menu">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Product
          </NavLink>
        </li>
      </ul>

      {/* Main */}
    </div>
  );
}

export default App;
