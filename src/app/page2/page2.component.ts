import { Component, OnInit } from '@angular/core';
import { ITDataGridSystem } from '../allTypes';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})
export class Page2Component implements OnInit {
  constructor(private _empService: EmployeeService) {}

  gridConfigs: ITDataGridSystem = {
    enableEditing: false,
    enableSearchPanel: true,
    page: [7, 9, 14],
    pageSize: 7,
  };

  columns: string[] = ['username', 'city', 'credit_card_company', 'phone'];
  listData = [];
  groupIndexColumnName = 'credit_card_company';

  ngOnInit(): void {
    this._empService.getEmployeeList().subscribe((data: any) => {
      this.listData = data.info as any;
    });
  }
}

// to run the fake json db server run this command
// json-server --watch db.json
