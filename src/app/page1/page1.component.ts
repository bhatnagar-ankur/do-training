import { Component } from '@angular/core';
import { ITDataGridSystem } from '../allTypes';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component {
  gridConfigs: ITDataGridSystem = {
    enableEditing: true,
    enableSearchPanel: true,
    // listData: {},
    page: [10, 14, 20],
  };
}
