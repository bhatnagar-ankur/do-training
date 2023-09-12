import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { ReusableListModule } from 'src/app/shared/components/reusable-list/reusable-list.module';
import { HomeComponent } from './home.component';

// import { list } from '../../shared/components/reusable-list'

@NgModule({
  declarations: [HomeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MatDialogModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    ReusableListModule
  ],
  
})
export class HomeModule {}
