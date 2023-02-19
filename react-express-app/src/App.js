import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

import './App.css';
import routes from './routes';

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
      <div className="main">
        <Routes>
          {routes.map((route, i) => {
            // console.log(route);
            const { path, Component } = route;
            return <Route key={i} path={path} element={<Component />} />;
          })}
        </Routes>
      </div>
    </div>
  );
}

export default App;
