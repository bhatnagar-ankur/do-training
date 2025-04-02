import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-timesheet',
  standalone: true,
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class TimesheetComponent {
  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  selectedDayIndex: number | null = null;
  timesheetEntries: FormArray;

  constructor(private fb: FormBuilder) {
    this.timesheetEntries = this.fb.array(
      this.weekdays.map(() =>
        this.fb.group({
          project: ['', Validators.required],
          client: ['', Validators.required],
          workMode: ['', Validators.required],
          taskDescription: ['', Validators.required],
          inTime: ['', Validators.required],
          offTime: ['', Validators.required],
          hoursWorked: [{ value: 0, disabled: true }],
        })
      )
    );
  }

  openForm(index: number): void {
    this.selectedDayIndex = index;
  }

  calculateHours(index: number): void {
    const entry = this.timesheetEntries.controls[index] as FormGroup;
    const inTime = entry.get('inTime')?.value;
    const offTime = entry.get('offTime')?.value;

    if (inTime && offTime) {
      const inTimeDate = new Date(`2023-01-01T${inTime}`);
      const offTimeDate = new Date(`2023-01-01T${offTime}`);
      const diff = (offTimeDate.getTime() - inTimeDate.getTime()) / (1000 * 60 * 60);
      entry.get('hoursWorked')?.setValue(diff > 0 ? diff.toFixed(2) : 0);
    }
  }

  get totalWeekHours(): number {
    return this.timesheetEntries.controls.reduce((sum, control) => {
      return sum + (Number(control.get('hoursWorked')?.value) || 0);
    }, 0);
  }

  onSubmit(): void {
    console.log('Timesheet Submitted:', this.timesheetEntries.value);
    alert('Timesheet submitted successfully!');
    this.selectedDayIndex = null;
  }

  closeForm(): void {
    this.selectedDayIndex = null;
  }

  getSelectedDayForm(): FormGroup {
    return this.timesheetEntries.controls[this.selectedDayIndex!] as FormGroup;
  }
}
