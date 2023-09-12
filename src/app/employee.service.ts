import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // list = [];

  constructor() {}

  getDataSource() {
    return new DataSource({
      store: {
        type: 'odata',
        url: 'http://localhost:3000/employee',
        key: 'id',
      },
    });
  }
}

