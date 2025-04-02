import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SupportComponent } from './components/support/support.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TimesheetComponent } from './components/employees/timesheet/timesheet.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LeaveRequestsComponent } from './components/employees/leave-requests/leave-requests.component'; 
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'support', component: SupportComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'timesheet', component: TimesheetComponent },
      { path: 'leave-requests', component: LeaveRequestsComponent },  
      { path: 'employee-list', component: EmployeeListComponent },
    ],
  },

  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

export default routes;
