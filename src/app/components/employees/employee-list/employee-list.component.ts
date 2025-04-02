import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicTableComponent } from '../../../shared/dynamic-table/dynamic-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 

interface Employee {
  ID: number | null;
  Name: string;
  Department: string;
  Email: string;
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    DynamicTableComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule 
  ],
})
export class EmployeeListComponent {
  employeeColumns: (keyof Employee)[] = ['ID', 'Name', 'Department', 'Email'];
  employeeData: Employee[] = [
    { ID: 1, Name: 'Jyoti', Department: 'HR', Email: 'jyoti@example.com' },
    { ID: 2, Name: 'Ashish', Department: 'Finance', Email: 'ashish@example.com' },
    { ID: 3, Name: 'Rahul', Department: 'Engineering', Email: 'rahul@example.com' },
    { ID: 4, Name: 'Sneha', Department: 'Marketing', Email: 'sneha@example.com' },
    { ID: 5, Name: 'Amit', Department: 'Sales', Email: 'amit@example.com' },
    { ID: 6, Name: 'Priya', Department: 'Design', Email: 'priya@example.com' },
    { ID: 7, Name: 'Anjali', Department: 'Operations', Email: 'anjali@example.com' },
    { ID: 8, Name: 'Kajal', Department: 'R&D', Email: 'kajal@example.com' },
    { ID: 9, Name: 'Nisha', Department: 'Admin', Email: 'nisha@example.com' },
    { ID: 10, Name: 'Arjun', Department: 'IT', Email: 'arjun@example.com' },
  ];

  filteredEmployees: Employee[] = [...this.employeeData];
  searchQuery: string = '';
  selectedDepartment: string = '';

  departments: string[] = ['HR', 'Finance', 'Engineering', 'Marketing', 'Sales', 'Design', 'Operations', 'R&D', 'Admin', 'IT'];
  
  minRows = 10; 

  applyFilter() {
    const searchTerm = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.employeeData.filter(emp =>
      (emp.Name.toLowerCase().includes(searchTerm) || emp.Department.toLowerCase().includes(searchTerm)) &&
      (this.selectedDepartment ? emp.Department === this.selectedDepartment : true)
    );

    this.fillEmptyRows();
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedDepartment = '';
    this.filteredEmployees = [...this.employeeData];
    this.fillEmptyRows();
  }

  sortEmployees(column: keyof Employee) {
    this.filteredEmployees = [...this.filteredEmployees].sort((a, b) => 
      String(a[column]).localeCompare(String(b[column]))
    );
    this.fillEmptyRows();
  }

  fillEmptyRows() {
    const currentLength = this.filteredEmployees.length;
    
    if (currentLength === 0) {
      return;
    }

    if (currentLength < this.minRows) {
      for (let i = currentLength; i < this.minRows; i++) {
        this.filteredEmployees.push({ ID: null, Name: '', Department: '', Email: '' }); 
      }
    }
  }

  isNoRecordsFound(): boolean {
    return this.filteredEmployees.every(emp => !emp.Name && !emp.Department && !emp.Email);
  }
}
