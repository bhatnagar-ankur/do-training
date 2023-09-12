import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // list = [];

  constructor(private _http: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employee', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employee/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employee');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employee/${id}`);
  }

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
