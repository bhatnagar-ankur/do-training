import { Component, OnInit } from '@angular/core';
import { ITDataGridSystem } from '../allTypes';
import { globalData } from '../globalData';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss'],
})

export class Page2Component implements OnInit {
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
    this.listData = globalData.employee.info as [];
  }
}

// to run the fake json db server run this command
// json-server --watch db.json
