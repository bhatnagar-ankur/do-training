import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { ReusableListComponent } from './reusable-list/reusable-list.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import {
  DxBulletModule,
  DxDataGridModule,
  DxTemplateModule,
  DxButtonModule,
  DxFilterBuilderModule,
  DxColorBoxModule,
} from 'devextreme-angular';
import { UsdInrPipe } from './pipes/usd-inr.pipe';

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    NavbarComponent,
    Page1Component,
    Page2Component,
    ReusableListComponent,
    TestComponent,
    UsdInrPipe,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    DxBulletModule,
    DxButtonModule,
    DxColorBoxModule,
    DxDataGridModule,
    DxFilterBuilderModule,
    DxTemplateModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: '', component: Page1Component }]),
    RouterModule.forRoot([{ path: 'about', component: AboutComponent }]),
    RouterModule.forRoot([{ path: 'page1', component: Page1Component }]),
    RouterModule.forRoot([{ path: 'page2', component: Page2Component }]),
    // RouterModule,
    RouterOutlet,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
