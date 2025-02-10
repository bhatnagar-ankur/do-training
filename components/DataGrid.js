import React, { useState } from 'react';

const DataGrid = ({ columns, data }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [ageFilter, setAgeFilter] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    applyFilters(value, ageFilter);
  };

  const handleAgeFilter = (event) => {
    const value = event.target.value;
    setAgeFilter(value);
    applyFilters(searchText, value);
  };

  const applyFilters = (searchText, ageFilter) => {
    const filteredRows = data.filter((row) =>
      row.name.toLowerCase().includes(searchText) ||
      row.city.toLowerCase().includes(searchText)
    ).filter((row) => 
      ageFilter === '' || row.age === parseInt(ageFilter, 10)
    );
    setFilteredData(filteredRows);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by Name or City"
          value={searchText}
          onChange={handleSearch}
          className="border rounded p-2"
        />
        <select
          value={ageFilter}
          onChange={handleAgeFilter}
          className="border rounded p-2"
        >
          <option value="">Filter by Age</option>
          {[...new Set(data.map(row => row.age))].map(age => (
            <option key={age} value={age}>{age}</option>
          ))}
        </select>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className="py-2 px-4 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="py-2 px-4 border-b border-gray-300 text-sm text-gray-900"
                >
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;
