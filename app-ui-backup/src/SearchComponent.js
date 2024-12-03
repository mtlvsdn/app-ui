import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SearchComponent = ({ onSearch }) => {
  const [searchCategory, setSearchCategory] = useState('Title');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Title', 'Subject', 'Tag'];

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, searchCategory.toLowerCase());
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input 
          type="text" 
          className="search-bar" 
          placeholder={`Search by ${searchCategory}...`}
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="dropdown-container">
          <button 
            className="dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <ChevronDown size={20} />
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {categories.map(category => (
                <button
                  key={category}
                  className="dropdown-item"
                  onClick={() => {
                    setSearchCategory(category);
                    setIsDropdownOpen(false);
                    // Reset search when category changes
                    setSearchTerm('');
                    onSearch('', category.toLowerCase());
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;