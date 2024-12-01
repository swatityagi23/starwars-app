import React, { useEffect, useState } from 'react';
import { SearchBarProps } from '../shared/types';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchValue);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [onSearch, searchValue]);
  return (
    <div className="flex items-center justify-center my-4 ">
      <input
        type="text"
        placeholder="Search for a character by name..."
        className="w-[50%] p-3 rounded-3xl text-black"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
