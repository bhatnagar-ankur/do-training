// import DataSource from 'devextreme/data/data_source';
import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ITDataGridSystem, ITDataSourceType } from './allTypes';


@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'reusable-devextreme';

  dataSource: ITDataSourceType = {
    age: 20,
    city: 'city',
    department: 'new',
    email: 'test@email.co',
    id: 0,
    name: 'name',
  };
  value = 'hi this is value from parent';

  constructor(public empService: EmployeeService) {}

  gridConfigs: ITDataGridSystem = {
    enableEditing: true,
    enableSearchPanel: true,
    // listData: this.dataSource,
    page: [5, 10, 20, 30],
    pageSize:5,
  };

  

  helloWorld(): void {
    console.log('hello world', this.title);
  }
}
