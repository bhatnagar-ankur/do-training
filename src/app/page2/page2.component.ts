import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ITDataGridSystem } from '../allTypes';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})
export class Page2Component implements OnInit {
  filterValue: any = [];

  constructor(private _empService: EmployeeService ,private _changeDetect:ChangeDetectorRef) {
    this.filterValue = [
      ['credit_card_company', '=', 'VISA'],
      'or',
      // ['city', '=', 'Chennai'],
    ];
  }

  gridConfigs: ITDataGridSystem = {
    enableEditing: false,
    enableSearchPanel: true,
    page: [7, 9, 14],
    pageSize: 7,
  };

  columns: string[] = ['username', 'city', 'credit_card_company', 'phone'];

  groupIndexColumnName = 'credit_card_company';
  listData = [];

  ngOnInit(): void {
    this._changeDetect.detectChanges()
    this._empService.getEmployeeList().subscribe((data: any) => {
      this.listData = data.info as any;
    });
    this.filterValue = [
      ['credit_card_company', '=', 'VISA'],
      'or',
      // ['city', '=', 'Chennai'],
    ];
  }
}

// to run the fake json db server run this command
// json-server --watch db.json
