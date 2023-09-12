import { Component,OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-reusable-list',
  templateUrl: './reusable-list.component.html',
  styleUrls: ['./reusable-list.component.scss'],
  providers:[EmployeeService]
})
export class ReusableListComponent  implements OnInit {
  dataSource: any;

  constructor(public empService: EmployeeService) {}

  ngOnInit(): void {
    this.empService.getEmployeeList().subscribe((res) => {
      this.dataSource = res.list;
    });
    console.log(this.dataSource);
  }
}
