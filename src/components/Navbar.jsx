import React from 'react';

const Navbar = ({ changeState }) => {
  return (
    <nav className="flex text-white px-10 py-2 mb-2 justify-between">
      <h1 className="font-bold text-3xl">Task Manager</h1>
      <button className="border px-3 py-2" onClick={changeState}>
        Switch Boards
      </button>
    </nav>
  );
};

export default Navbar;
