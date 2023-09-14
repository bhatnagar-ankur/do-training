
import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'reusable-devextreme';
  constructor(public empService: EmployeeService) {}
}


// to run the fake json db server run this command
// json-server --watch db.json
