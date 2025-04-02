import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent {
  @Input() label: string = 'Click Me';  
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary'; 
  @Input() size: 'small' | 'medium' | 'large' = 'medium'; 
  @Input() disabled: boolean = false;  

  @Output() buttonClick = new EventEmitter<void>(); 

  onClick() {
    if (!this.disabled) {
      this.buttonClick.emit(); 
    }
  }
}
