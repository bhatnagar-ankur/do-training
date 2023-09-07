import { Component, EventEmitter, Input, Output } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { EmployeeService } from './employee.service';

import { ITDataGridSystem, ITDataSourceType } from './allTypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'reusable-devextreme';
  i = 0;
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
    listData: this.dataSource,
    page: [5, 10, 20, 30],
    enableEditing: true,
    enableSearchPanel: true,
  };

  ngOnInit(): void {
    this.empService.getEmployeeList().subscribe((res) => {
      this.dataSource = res.list;
      console.log(res);
    });
  }

  helloWorld() {
    this.i++;
    console.log('hello world', this.i);
  }
}
