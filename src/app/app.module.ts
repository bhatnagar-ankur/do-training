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
// import { TestComponent } from './test/test.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ReusableListComponent,
    // TestComponent,
    Page1Component,
    Page2Component,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    DxBulletModule,
    DxDataGridModule,
    DxTemplateModule,
    HttpClientModule,
    DxButtonModule,
    BrowserModule,
    RouterModule.forRoot([{ path: 'page1', component: Page1Component }]),
    RouterModule.forRoot([{ path: 'page2', component: Page2Component }]),
    RouterOutlet,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
