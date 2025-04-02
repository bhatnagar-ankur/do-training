import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  employeeCount = 120;
  activeProjects = 8;
  pendingLeaves = 5;
  recentActivities = [
    { user: "Kajal", action: "Checked in", time: "10:30 AM" },
    { user: "Akshat", action: "Submitted timesheet", time: "Yesterday" },
    { user: "Anjali", action: "Applied for leave", time: "2 days ago" },
  ];
}
