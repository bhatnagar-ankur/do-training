import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ReusableListComponent } from './reusable-list.component';


@NgModule({
  declarations: [ReusableListComponent],
  imports: [
    CommonModule,
    BrowserModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
  ],
  exports:[ReusableListComponent]
})
export class ReusableListModule { }
