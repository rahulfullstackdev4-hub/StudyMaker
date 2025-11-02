import React, { useState } from "react";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCut = () => {
    alert("Cut action!");
  };

  const handleView = () => {
    alert("View action!");
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="bg-gray-800 text-white rounded-md px-4 py-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Menu
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <button
            onClick={handleCut}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cut
          </button>
          <button
            onClick={handleView}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            View
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
