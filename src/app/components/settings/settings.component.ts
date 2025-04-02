import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  imports: [CommonModule, FormsModule, MatSnackBarModule]
})
export class SettingsComponent {
  name: string = '';
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  emailNotifications: boolean = true;
  smsNotifications: boolean = true;

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  updateProfile() {
    alert(`Profile Updated!\nName: ${this.name}\nEmail: ${this.email}`);
  }

  updatePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password updated successfully!");
  }

  savePreferences() {
    alert("Notification preferences saved!");
  }

  deleteAccount() {
    
    const snackBarRef = this.snackBar.open(
      'Are you sure you want to delete your account? This action is irreversible!',
      'Delete',
      { duration: 5000 }
    );

    snackBarRef.onAction().subscribe(() => {
     
      localStorage.removeItem('users');
      localStorage.removeItem('currentUser');

    
      this.router.navigate(['/login']);
    });
  }
}
