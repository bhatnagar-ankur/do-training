import { Component, OnInit } from '@angular/core';
import { ITDataGridSystem, ITDataSourceList } from '../allTypes';
import { globalData } from '../globalData';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit {

  constructor( private _empService:EmployeeService ){}

  gridConfigs: ITDataGridSystem = {
    enableEditing: true,
    enableSearchPanel: false,
    page: [10, 14, 20],
    pageSize: 10,
  };


  columns: string[] = ['id', 'city', 'name', 'department', 'email'];
  listData: ITDataSourceList[] = [];
  groupIndexColumnName = 'name';

  ngOnInit(): void {
    this.listData = globalData.employee.list as [];
   console.log( this._empService.getEmployeeList(),"here is value");
  }
}

// to run the fake json db server run this command
// json-server --watch db.json
