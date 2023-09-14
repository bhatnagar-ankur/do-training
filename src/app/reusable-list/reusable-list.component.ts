import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import {
  ITDataGridSystem,
  ITDataSourceList,
  ITDataSourceType,
} from '../allTypes';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-reusable-list',
  templateUrl: './reusable-list.component.html',
  styleUrls: ['./reusable-list.component.scss'],
  providers: [EmployeeService],
})
export class ReusableListComponent implements OnInit {
  constructor(public empService: EmployeeService) {}

  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;

  @Input() value: string = 'DataGrid';
  @Input() gridConfigs: ITDataGridSystem = {
    enableEditing: true,
    enableSearchPanel: true,
    page: [5, 10],
    pageSize: 5,
  };
  // current = new Date().getFullYear();
  // years = [this.current, this.current + 1];

  @Input() getColumns: string[] = [];
  updatedColumns: any = [];
  // storageKey: string = 'datagrid-item';

  replaceItemInArray(
    givenArray: string[] | number[],
    oldItem: string | number,
    newItem: string | number
  ): string[] | number[] {
    return givenArray.map((item: any) => (item === oldItem ? newItem : item));
  }

  saveGridState() {
    if (this.dataGrid) {
      const gridState = this.dataGrid.instance.state();
      localStorage.setItem('gridState', JSON.stringify(gridState));
    }
  }

  restoreGridState() {
    const savedState = localStorage.getItem('gridState');
    if (this.dataGrid && savedState) {
      this.dataGrid.instance.state(JSON.parse(savedState));
    }
  }

  @Input() listData!: ITDataSourceType | ITDataSourceList | any; //this is default data
  //object.keys()
  ngOnInit(): void {
    // this.getColumns = Object.keys(this.listData[0]) as string[];
    // this.updatedColumns = this.replaceItemInArray(
    //   this.getColumns,
    //   'credit_card_company',
    //   'ccc'
    // );
    // this.saveState(this.listData)

    // console.log('inside the resuable', this.getColumns, this.updatedColumns);
  }
}
