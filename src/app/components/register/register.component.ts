import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [FormDataService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  formData: any = null;

  constructor(private fb: FormBuilder, private formDataService: FormDataService, private router: Router)

  {
    this.registerForm = this.fb.group({});
  }

  ngOnInit() {
    this.formDataService.getFormData().subscribe(
      (data) => {
        console.log('Fetched form data:', data);
        this.formData = data;
        this.buildForm(); 
      },
      (error) => console.error('Error fetching form data:', error)
    );
  }

  buildForm() {
    if (!this.formData) return;

    const formGroup: any = {};

    this.formData.fields.forEach((field: any) => {
      const validators = field.required ? [Validators.required] : [];
      formGroup[field.name] = this.fb.control('', validators);
    });


    this.registerForm = this.fb.group(formGroup, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { name, email, password, joiningYear } = this.registerForm.value;

     
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      if (users.some((user: any) => user.email === email)) {
        alert('User already exists! Please login.');
        return;
      }

      
      users.push({ name, email, password, joiningYear });
      localStorage.setItem('users', JSON.stringify(users));

      alert('Registration successful! Redirecting to login...');
      this.router.navigate(['/login']);
    } else {
      console.error('Form is invalid');
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
