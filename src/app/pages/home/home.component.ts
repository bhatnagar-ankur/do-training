import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { ReusableListComponent } from '../../shared/components/reusable-list/reusable-list.component';

// interface ITDataSourceType {
//   id: number;
//   name: string;
//   email: string;
//   age: number;
//   department: string;
//   city: string;
// }

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [EmployeeService],
})
export class HomeComponent implements OnInit {
  dataSource: any;

  constructor(public empService: EmployeeService) {}

  ngOnInit(): void {
    this.empService.getEmployeeList().subscribe((res) => {
      this.dataSource = res.list;
    });
    console.log(this.dataSource);
  }
}
