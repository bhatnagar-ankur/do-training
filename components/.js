import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ReusableDataGrid = ({ columns, rows, filterOptions }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [ageFilter, setAgeFilter] = useState('');

  useEffect(() => {
    applyFilters(searchText, ageFilter);
  }, [searchText, ageFilter, rows]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
  };

  const handleAgeFilter = (event) => {
    const value = event.target.value;
    setAgeFilter(value);
  };

  const applyFilters = (searchText, ageFilter) => {
    const filteredData = rows.filter((row) =>
      Object.values(row).some((val) =>
        typeof val === 'string' && val.toLowerCase().includes(searchText)
      )
    ).filter((row) =>
      ageFilter === '' || row.age === ageFilter
    );
    setFilteredRows(filteredData);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
        />
        {filterOptions && (
          <FormControl variant="outlined" style={{ width: '200px' }}>
            <InputLabel>Filter by Age</InputLabel>
            <Select
              value={ageFilter}
              onChange={handleAgeFilter}
              label="Filter by Age"
            >
              <MenuItem value=''><em>None</em></MenuItem>
              {filterOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 15, 20, 25]}
          checkboxSelection
          disableSelectionOnClick
          sortingOrder={['asc', 'desc']}
        />
      </div>
    </div>
  );
};

export default ReusableDataGrid;