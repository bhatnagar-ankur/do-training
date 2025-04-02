import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  fixedRowCount = 5; 
  getDisplayedRows(): any[] {
    if (this.data.length === 0) return [];
    const extraRows = this.fixedRowCount - this.data.length;
    return this.data.concat(new Array(extraRows > 0 ? extraRows : 0).fill({}));
  }
}
