// Sidebar.js

import React from 'react';
import './Sidebar.css'; // Import the CSS file for styling

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>Explore</li>
        <li>Trending</li>
        <li>Tech</li>
        <li>Creative</li>
        <li>Sports</li>
        <li>Academic</li>
        <li>Saved</li>
      </ul>
    </div>
  );
}

export default Sidebar;