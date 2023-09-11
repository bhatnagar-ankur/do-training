export interface ITDataGridSystem {
  enableEditing: boolean;
  enableSearchPanel: boolean;
  page: number[];
  pageSize:number;
}

export interface ITDataSourceType {
  age: number;
  city: string;
  department: string;
  email: string;
  id: number;
  name: string;
}
