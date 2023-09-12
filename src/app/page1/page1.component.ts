import { Component, OnInit } from '@angular/core';
import { ITDataGridSystem } from '../allTypes';
import { globalData } from '../globalData';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit {
  gridConfigs: ITDataGridSystem = {
    enableEditing: true,
    enableSearchPanel: true,
    page: [10, 14, 20],
    pageSize: 10,
  };

  listData = [];

  ngOnInit(): void {
    this.listData = globalData.employee.list as [];
  }
}
