import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <>
      <nav className="flex items-center justify-between p-6 lg:px-8 border-b-4 border-yellow-500">
        <div className="flex lg:flex-1">
          <Link className="text-lg font-bold text-yellow-500 uppercase" to="/">
            Star Wars Characters
          </Link>
        </div>
        <div className="flex lg:gap-x-12 gap-x-2">
          <Link to="/">Character</Link>
          <Link to="/favourites">Favourite</Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
