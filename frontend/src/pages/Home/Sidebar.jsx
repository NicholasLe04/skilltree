// Sidebar.js

import React from 'react';
import './Sidebar.css'; // Import the CSS file for styling

function Sidebar({category}) {
  return (
    <div className="sidebar">
      <ul>
        <li>Explore</li>
        {category.map((e) => <li onClick={() => e.ref.current.scrollIntoView({behavior: "smooth"})}> {e.category}</li>)}
      </ul>
    </div>
  );
}

export default Sidebar;