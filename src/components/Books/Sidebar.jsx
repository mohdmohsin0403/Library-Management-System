// src/components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import your sidebar CSS

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/home">Logout</Link> {/* Link to the homepage */}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
