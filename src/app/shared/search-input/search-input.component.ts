import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input() placeholder: string = 'Search...';  
  @Output() searchChange = new EventEmitter<string>(); 
  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement; 
    this.searchChange.emit(inputElement.value); 
  }
  
}
