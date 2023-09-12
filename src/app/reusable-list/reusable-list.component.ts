import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {
  ITDataGridSystem,
  ITDataSourceList,
  ITDataSourceType,
} from '../allTypes';

@Component({
  selector: 'app-reusable-list',
  templateUrl: './reusable-list.component.html',
  styleUrls: ['./reusable-list.component.scss'],
  providers: [EmployeeService],
})
export class ReusableListComponent implements OnInit {
  constructor(public empService: EmployeeService) {}
  @Input() value: string = 'DataGrid';
  @Input() gridConfigs: ITDataGridSystem = {
    enableEditing: true,
    enableSearchPanel: true,
    page: [5, 10],
    pageSize: 5,
  };

  getColumns: any = [];
  updatedColumns: any = [];

  replaceItemInArray(
    givenArray: string[] | number[],
    oldItem: string | number,
    newItem: string | number
  ): string[] | number[] {
    return givenArray.map((item: any) => (item === oldItem ? newItem : item));
  }

  @Input() listData!: ITDataSourceType | ITDataSourceList | any; //this is default data
  //object.keys()
  ngOnInit(): void {
    this.getColumns = Object.keys(this.listData[0]);
    this.updatedColumns = this.replaceItemInArray(
      this.getColumns,
      'credit_card_company',
      'credit card'
    );
    console.log('inside the resuable', this.getColumns,this.updatedColumns);
  }
}
