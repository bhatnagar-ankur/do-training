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

  savedState = localStorage.getItem('gridState');
  gridState = JSON.parse(this.savedState || '{}');

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

  ngOnInit(): void {
    // this.restoreGridState();
    console.log(this.gridState, 'init');
  }

  onValueChanged(e: any) {
    this.currentColor = e.value;
    this.saveGridState();
  }

  onCellPrepared(e: any) {
    const savedState = JSON.parse(localStorage.getItem('gridColor') as string);
    //const gridState = JSON.parse(savedState || '{}');
    let bgColorFromState = '';
    let textColorFromState = '';
    if (savedState?.customization) {
      bgColorFromState = savedState.customization.backgroundColor;
      textColorFromState = savedState.customization.textColor;
      this.currentColor = bgColorFromState;
      this.currentColorText = textColorFromState;
    }
    if (e.rowType === 'data') {
      if (
        e.column.dataField === this.customisationOfGrid.highlightedColumnName
      ) {
        e.cellElement.style.backgroundColor = bgColorFromState; // this.currentColor;
        e.cellElement.style.color = textColorFromState; // this.currentColorText;
      }
      console.log(this.currentColor);
    }
  }

  saveGridState() {
    const gridState =
      JSON.parse(localStorage.getItem('gridColor') as string) || {};
    gridState.customization = {
      backgroundColor: this.currentColor,
      textColor: this.currentColorText,
    };
    localStorage.setItem('gridColor', JSON.stringify(gridState));
  }

  restoreGridState() {
    const savedState = localStorage.getItem('gridState');
    if (this.dataGrid && savedState) {
      const gridState = JSON.parse(savedState);
      const customization = gridState.customization;
      if (customization) {
        this.currentColor = customization.backgroundColor;
        this.currentColorText = customization.textColor;
      }
      this.dataGrid.instance.state(gridState);
    }
  }
}
