import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicTableComponent } from '../../shared/dynamic-table/dynamic-table.component';
import { SearchInputComponent } from "../../shared/search-input/search-input.component";
import { CustomButtonComponent } from "../../shared/custom-button/custom-button.component";

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicTableComponent, SearchInputComponent, CustomButtonComponent],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  attendanceColumns = ['ID', 'Employee', 'Check-in', 'Check-out'];
   attendanceData = [
    { ID: 1, Employee: 'Anjali', 'Check-in': '9:00 AM', 'Check-out': '6:00 PM' },
    { ID: 2, Employee: 'Kajal', 'Check-in': '9:30 AM', 'Check-out': '6:30 PM' },
    { ID: 3, Employee: 'Rajesh', 'Check-in': '8:45 AM', 'Check-out': '5:45 PM' },
    { ID: 4, Employee: 'Simran', 'Check-in': '10:00 AM', 'Check-out': '7:00 PM' },
    { ID: 5, Employee: 'Amit', 'Check-in': '9:15 AM', 'Check-out': '6:15 PM' },
    { ID: 6, Employee: 'Sneha', 'Check-in': '10:30 AM', 'Check-out': '7:30 PM' },
    { ID: 7, Employee: 'Vikram', 'Check-in': '8:00 AM', 'Check-out': '4:00 PM' },
    { ID: 8, Employee: 'Priya', 'Check-in': '9:45 AM', 'Check-out': '6:45 PM' },
    { ID: 9, Employee: 'Arun', 'Check-in': '9:00 AM', 'Check-out': '6:00 PM' },
    { ID: 10, Employee: 'Nisha', 'Check-in': '10:15 AM', 'Check-out': '7:15 PM' },
];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedData = [...this.attendanceData]; 

  constructor() {
    this.updatePagination();
  }

  updatePagination() {
    let filteredData = this.attendanceData;
    if (this.searchTerm) {
      filteredData = this.attendanceData.filter(emp =>
        emp.Employee.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedData = filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.attendanceData.length / this.itemsPerPage);
  }

  prevPage():void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}