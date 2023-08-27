import React from 'react';

const Filter = ({ filterValue, onFilterChange }) => {
  const handleFilterChange = event => {
    const newFilterValue = event.target.value;
    onFilterChange(newFilterValue);
    localStorage.setItem('filter', newFilterValue);
  };

  return (
    <div>
      <h2>Contacts</h2>
      <input
        type="text"
        name="filter"
        value={filterValue}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;