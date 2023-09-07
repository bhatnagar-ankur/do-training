import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'reusable-devextreme';
  i = 0;
  helloWorld() {
    this.i++;
    console.log('hello world',this.i);
  }
}
