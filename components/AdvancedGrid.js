
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 110 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const rows = [
  { id: 1, name: 'Anjali Sharma', age: 25, email: 'anjali.sharma@example.com' },
  { id: 2, name: 'Ravi Kumar', age: 32, email: 'ravi.kumar@example.com' },
  { id: 3, name: 'Priya Singh', age: 28, email: 'priya.singh@example.com' },
  { id: 4, name: 'Vikram Patil', age: 40, email: 'vikram.patil@example.com' },
  { id: 5, name: 'Meera Desai', age: 35, email: 'meera.desai@example.com' },
  { id: 6, name: 'Rajesh Gupta', age: 45, email: 'rajesh.gupta@example.com' },
  { id: 7, name: 'Sneha Kapoor', age: 30, email: 'sneha.kapoor@example.com' },
  { id: 8, name: 'Amit Joshi', age: 29, email: 'amit.joshi@example.com' },
  { id: 9, name: 'Kavita Nair', age: 27, email: 'kavita.nair@example.com' },
  { id: 10, name: 'Suresh Reddy', age: 38, email: 'suresh.reddy@example.com' },
  { id: 11, name: 'Neha Verma', age: 31, email: 'neha.verma@example.com' },
  { id: 12, name: 'Arjun Mehta', age: 34, email: 'arjun.mehta@example.com' },
  { id: 13, name: 'Radhika Iyer', age: 26, email: 'radhika.iyer@example.com' },
  { id: 14, name: 'Sanjay Chauhan', age: 43, email: 'sanjay.chauhan@example.com' },
  { id: 15, name: 'Pooja Malhotra', age: 37, email: 'pooja.malhotra@example.com' },
  { id: 16, name: 'Anil Thakur', age: 36, email: 'anil.thakur@example.com' },
  { id: 17, name: 'Divya Bhatt', age: 24, email: 'divya.bhatt@example.com' },
  { id: 18, name: 'Nitin Agarwal', age: 39, email: 'nitin.agarwal@example.com' },
  { id: 19, name: 'Swati Rao', age: 33, email: 'swati.rao@example.com' },
  { id: 20, name: 'Vivek Shah', age: 41, email: 'vivek.shah@example.com' },
  { id: 21, name: 'Ritu Jain', age: 30, email: 'ritu.jain@example.com' },
  { id: 22, name: 'Manoj Tiwari', age: 44, email: 'manoj.tiwari@example.com' },
  { id: 23, name: 'Shweta Roy', age: 29, email: 'shweta.roy@example.com' },
  { id: 24, name: 'Gaurav Sen', age: 35, email: 'gaurav.sen@example.com' },
  { id: 25, name: 'Anita Das', age: 27, email: 'anita.das@example.com' },
];

const AdvancedGrid = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
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
    const filteredData = rows.filter((row) =>
      row.name.toLowerCase().includes(searchText) ||
      row.email.toLowerCase().includes(searchText)
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
        <FormControl variant="outlined" style={{ width: '200px' }}>
          <InputLabel>Filter by Age</InputLabel>
          <Select
            value={ageFilter}
            onChange={handleAgeFilter}
            label="Filter by Age"
          >
            <MenuItem value=''><em>None</em></MenuItem>
            {[...new Set(rows.map(row => row.age))].map(age => (
              <MenuItem key={age} value={age}>{age}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          sortingOrder={['asc', 'desc']}
        />
      </div>
    </div>
  );
};

export default AdvancedGrid;
