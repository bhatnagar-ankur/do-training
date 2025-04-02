import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],  
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('loggedInUser'); 
   
    this.router.navigate(['/login']);
  }
}
