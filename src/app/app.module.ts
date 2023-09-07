import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReusableListComponent } from './reusable-list/reusable-list.component';
import { HttpClientModule } from '@angular/common/http';
import {
  DxBulletModule,
  DxDataGridModule,
  DxTemplateModule,
  DxButtonModule,
} from 'devextreme-angular';

@NgModule({
  declarations: [AppComponent, ReusableListComponent],
  imports: [
    BrowserModule,
    DxBulletModule,
    DxDataGridModule,
    DxTemplateModule,
    HttpClientModule,
    DxButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
