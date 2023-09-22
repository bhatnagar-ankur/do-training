import { Component, Input, ViewChild, OnInit } from '@angular/core';
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
  @ViewChild(DxDataGridComponent, {
    static: false,
  })
  dataGrid!: DxDataGridComponent;

  @Input() filterValue = [];
  gridFilterValue: any;
  groupIndex: number = 0;
  popupPosition: any;
  currentColor: string = '#f05b41';
  currentColorText: string = 'white';

  @Input() customisationOfGrid = {
    gridBackgroundColor: 'yellow',
    gridTextColor: 'black',
    highlightedColumnName: 'id',
  };

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

  onCellPrepared(e: any) {
    if (e.rowType === 'data') {
      if (
        e.column.dataField === this.customisationOfGrid.highlightedColumnName
      ) {
        //this should be in lowercase
        console.log(this.currentColor, 'here is event');
        e.cellElement.style.backgroundColor = this.currentColor;
        e.cellElement.style.color = this.currentColorText;
      }
    }
  }

  ngOnInit(): void {
    console.log(this.currentColor);
  }

  replaceItemInArray = (
    givenArray: string[] | number[],
    oldItem: string | number,
    newItem: string | number
  ): string[] | number[] =>
    givenArray.map((item: any) => (item === oldItem ? newItem : item));

  restoreGridState() {
    const savedState = localStorage.getItem('gridState');
    if (this.dataGrid && savedState)
      this.dataGrid.instance.state(JSON.parse(savedState));
  }

  saveGridState() {
    if (this.dataGrid) {
      const gridState = this.dataGrid.instance.state();
      localStorage.setItem('gridState', JSON.stringify(gridState));
    }
  }
}
