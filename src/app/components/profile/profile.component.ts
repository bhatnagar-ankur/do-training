import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  name: string = '';
  email: string = '';
  joiningYear: string = '';

  ngOnInit() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users.length > 0 ? users[users.length - 1] : null;

    if (currentUser) {
      this.name = currentUser.name || 'N/A';
      this.email = currentUser.email || 'N/A';
      this.joiningYear = currentUser.joiningYear || 'N/A';
    }
  }
}
