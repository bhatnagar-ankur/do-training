import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

     
      const users: any[] = JSON.parse(localStorage.getItem('users') || '[]'); 

     
      const user = users.find((user: any) => user.email === email);

      if (!user) {
        this.snackBar.open('User does not exist. Please register.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      } else if (user.password !== password) {
        this.snackBar.open('Incorrect password. Please try again.', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      } else {
        this.snackBar.open('Login successful!', 'Close', { duration: 2000, panelClass: ['success-snackbar'] });

        localStorage.setItem('loggedInUser', JSON.stringify(user));

        setTimeout(() => {
          this.router.navigate(['/dashboard']); 
        }, 500);  
      }
    } else {
      this.snackBar.open('Please enter valid credentials', 'Close', { duration: 2000, panelClass: ['error-snackbar'] });
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
