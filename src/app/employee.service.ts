import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import DataSource from 'devextreme/data/data_source';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employee');
  }
}
