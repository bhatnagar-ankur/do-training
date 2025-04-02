import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class LeaveRequestsComponent implements OnInit { 
  leaveForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.leaveForm = this.fb.group({
      employeeName: ['', Validators.required],
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.leaveForm.valid) {
      console.log('Leave Request Submitted:', this.leaveForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
