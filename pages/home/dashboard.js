import React from 'react';
import HomeLayout from "@/components/HomeLayout"; 
import DataGrid from '@/components/DataGrid';

const Dashboard = ({ userRole }) => {
 
  const data = [
    { name: 'Ananya', age: 21, city: 'New Delhi' },
  { name: 'Hema', age: 19, city: 'Noida' },
  { name: 'Rohit', age: 23, city: 'Mumbai' },
  { name: 'Sneha', age: 25, city: 'Chennai' },
  { name: 'Amit', age: 22, city: 'Pune' },
  { name: 'Priya', age: 20, city: 'Bangalore' },
  { name: 'Karan', age: 27, city: 'Hyderabad' },
  { name: 'Pooja', age: 24, city: 'Kolkata' },
  { name: 'Vikas', age: 26, city: 'Ahmedabad' },
  { name: 'Neha', age: 28, city: 'Jaipur' },
  { name: 'Suresh', age: 19, city: 'Lucknow' },
  { name: 'Divya', age: 21, city: 'Chandigarh' },
  { name: 'Manish', age: 22, city: 'Bhopal' },
  { name: 'Ritu', age: 23, city: 'Indore' },
  { name: 'Akash', age: 24, city: 'Patna' },
  { name: 'Nisha', age: 25, city: 'Vadodara' },
  { name: 'Ravi', age: 26, city: 'Ludhiana' },
  { name: 'Asha', age: 27, city: 'Agra' },
  { name: 'Raj', age: 28, city: 'Nagpur' },
  { name: 'Alok', age: 29, city: 'Kanpur' },
  { name: 'Sonal', age: 30, city: 'Surat' },
  { name: 'Meera', age: 31, city: 'Thane' },
  { name: 'Vivek', age: 32, city: 'Ghaziabad' },
];

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Age', accessor: 'age' },
    { header: 'City', accessor: 'city' },
  ];

  return (
    <HomeLayout userRole={userRole}>
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card Title 1</h2>
            <p className="text-gray-600">This is a description1</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card Title 2</h2>
            <p className="text-gray-600">This is a description2</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card Title 3</h2>
            <p className="text-gray-600">This is a description3</p>
          </div>
        </div>
    
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Grid</h2>
          <DataGrid columns={columns} data={data} />
        </div>
      </div>
    </HomeLayout>
  );
};

export default Dashboard;
