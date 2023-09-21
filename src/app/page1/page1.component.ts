import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ITDataGridSystem, ITDataSourceList } from '../allTypes';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit {
  filterValue: any = [];
  constructor(
    private _empService: EmployeeService,
    private _changeDetect: ChangeDetectorRef
  ) {
    this.filterValue = [
      ['department', '=', 'Finance'],
      'or',
      ['city', '=', 'Chennai'],
    ];
  }

  gridConfigs: ITDataGridSystem = {
    enableEditing: true,
    enableSearchPanel: false,
    page: [10, 14, 20],
    pageSize: 10,
  };

  customisationOfGrid = {
    gridBackgroundColor: 'orange',
    gridTextColor: 'black',
    highlightedColumnName: 'department',
  };

  columns: string[] = ['id', 'city', 'name', 'department', 'email'];
  listData: ITDataSourceList[] = [];
  groupIndexColumnName = 'name';

  ngOnInit(): void {
    this._changeDetect.detectChanges();
    this._empService.getEmployeeList().subscribe((data: any) => {
      this.listData = data.list;
      this.filterValue = [
        ['department', '=', 'Finance'],
        'or',
        ['city', '=', 'Chennai'],
      ];
    });
  }
}

// to run the fake json db server run this command
// json-server --watch db.json
