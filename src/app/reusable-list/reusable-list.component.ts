import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { EmployeeService } from '../employee.service';
import {
  ITDataGridSystem,
  ITDataSourceList,
  ITDataSourceType,
} from '../allTypes';
import { DxDataGridComponent } from 'devextreme-angular';
// import value from 'globalize';

@Component({
  selector: 'app-reusable-list',
  templateUrl: './reusable-list.component.html',
  styleUrls: ['./reusable-list.component.scss'],
  providers: [EmployeeService],
})
export class ReusableListComponent implements OnChanges, OnInit {
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
    // gridBackgroundColor: 'yellow',
    // gridTextColor: 'black',
    highlightedColumnName: 'id',
  };

  ngOnInit(): void {
    console.log(this.dataGrid, 'here is change2');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'here is change');
  }

  doChange() {
    window.location.reload();
  }

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

  onValueChanged(e: any, colorType: string) {
    if (colorType === 'bgColor') this.currentColor = e.value;
    if (colorType === 'textColor') this.currentColorText = e.value;
    this.saveGridState();
  }

  onSelectChange(e: any) {
    this.onValueChanged;
    this.customisationOfGrid.highlightedColumnName = e.value;
    console.log(e.value, 'on change ');
    this.saveGridState();
  }

  count = 0;
  onCellPrepared(e: any) {
    // debugger;
    const savedState = JSON.parse(localStorage.getItem('gridColor') as string);
    let bgColorFromState = '';
    let textColorFromState = '';
    let columnHighlightedFromState = '';

    // console.log(savedState, this.count);
    if (savedState?.customization) {
      bgColorFromState = savedState.customization.backgroundColor;
      textColorFromState = savedState.customization.textColor;
      columnHighlightedFromState = savedState.customization.currentColumn;

      //////////////////////
      this.currentColor = bgColorFromState;
      this.currentColorText = textColorFromState;
      this.customisationOfGrid.highlightedColumnName =
        columnHighlightedFromState;
    }
    if (e.rowType === 'data') {
      if (
        // e.column.dataField === this.customisationOfGrid.highlightedColumnName
        e.column.dataField === this.customisationOfGrid.highlightedColumnName
      ) {
        this.count++;
        e.cellElement.style.backgroundColor = bgColorFromState; // this.currentColor;
        e.cellElement.style.color = textColorFromState; // this.currentColorText;
      }
    }
  }

  saveGridState() {
    const gridState =
      JSON.parse(localStorage.getItem('gridColor') as string) || {};
    gridState.customization = {
      backgroundColor: this.currentColor,
      textColor: this.currentColorText,
      currentColumn: this.customisationOfGrid.highlightedColumnName,
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
