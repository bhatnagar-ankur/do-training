import { useState, useEffect } from "react";
import HomeLayout from "@/components/HomeLayout";
import ReusableDataGrid from "@/components/ReusableDataGrid"; 

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 110 },
  { field: 'email', headerName: 'Email', width: 200 },
];

const rows = [
  { id: 1, name: 'Anjali Sharma', age: 25, email: 'anjali.sharma@example.com' },
  { id: 2, name: 'Ravi ', age: 32, email: 'ravi.kumar@example.com' },
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

const filterOptions = [...new Set(rows.map(row => row.age))]; 

export default function Profile() {
    return (
        <HomeLayout>
            <div className="flex flex-wrap justify-center mt-8">
                <div className="p-6 bg-white rounded-lg shadow-md w-full lg:w-2/3 m-4">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">User  Data Grid</h2>
                    <ReusableDataGrid columns={columns} rows={rows} filterOptions={filterOptions} />
                </div>
            </div>
        </HomeLayout>
    );
}