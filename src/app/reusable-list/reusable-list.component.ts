import { Component, Input, ViewChild } from '@angular/core';
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
export class ReusableListComponent {
  @Input() filterValue = [
    ['department', '=', 'Finance'],
    'or',
    ['city', '=', 'Chennai'],
  ];
  gridFilterValue: any;
  groupIndex: number = 0;
  popupPosition: any;

  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;

  @Input() getColumns: string[] = [];
  @Input() gridConfigs: ITDataGridSystem = {
    enableEditing: true,
    enableSearchPanel: true,
    page: [5, 10],
    pageSize: 5,
  };
  @Input() listData!: ITDataSourceType | ITDataSourceList | any;
  @Input() value: string = 'DataGrid';
  updatedColumns: any = [];

  @Input() groupIndexColumnName: string = '';

  replaceItemInArray = (
    givenArray: string[] | number[],
    oldItem: string | number,
    newItem: string | number
  ): string[] | number[] =>
    givenArray.map((item: any) => (item === oldItem ? newItem : item));

  restoreGridState() {
    const savedState = localStorage.getItem('gridState');
    if (this.dataGrid && savedState) {
      this.dataGrid.instance.state(JSON.parse(savedState));
    }
  }

  saveGridState() {
    if (this.dataGrid) {
      const gridState = this.dataGrid.instance.state();
      localStorage.setItem('gridState', JSON.stringify(gridState));
    }
  }
}
