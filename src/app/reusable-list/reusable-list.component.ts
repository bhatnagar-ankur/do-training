import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ITDataGridSystem } from '../allTypes';

@Component({
  selector: 'app-reusable-list',
  templateUrl: './reusable-list.component.html',
  styleUrls: ['./reusable-list.component.scss'],
  providers: [EmployeeService],
})
export class ReusableListComponent implements OnInit {
  dataSource: any = {
    age: 20,
    city: 'new',
    department: 'new',
    email: 'test@test.com',
    id: 0,
    name: 'name',
  };

  constructor(public empService: EmployeeService) {}
  @Input() value: string = 'DataGrid';
  @Input() gridConfigs: ITDataGridSystem = {
    enableEditing: true,
    enableSearchPanel: true,
    // listData: this.dataSource ,
    page: [5, 10],
    pageSize: 5,
  };

  @Input() listData = {}; //this is default data

  ngOnInit(): void {
    // console.log(this.gridConfigs.listData,"here is res")
    this.empService.getEmployeeList().subscribe((res) => {
      // this.listData = res.list;
      // console.log(res);
    });
  }
}
