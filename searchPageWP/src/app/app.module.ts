import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { SearchPageSpfxWebPartComponent } from './search-page-spfx-web-part/search-page-spfx-web-part.component';
import { SearchByComponent } from './search-by/search-by.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { BorderDirective } from './directives/border.directive';
import { SearchByEmployeePipe } from './pipes/search-by-employee.pipe';
import { SearchByDepartmentPipe } from './pipes/search-by-department.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AZComponent } from './a-z/a-z.component';
import { SearchByAZPipe } from './pipes/search-by-az.pipe';

@NgModule({
  declarations: [
    SearchPageSpfxWebPartComponent,
    SearchByComponent,
    EmployeesListComponent,
    BorderDirective,
    SearchByEmployeePipe,
    SearchByDepartmentPipe,
    AZComponent,
    SearchByAZPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  entryComponents: [SearchPageSpfxWebPartComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(SearchPageSpfxWebPartComponent, { injector: this.injector });
    customElements.define('app-search-page-spfx-web-part', el);
  }
}
