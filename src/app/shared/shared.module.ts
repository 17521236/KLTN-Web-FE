import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { VccInputComponent } from './component/vcc-input/vcc-input.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconsProviderModule } from '../icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { HeaderComponent } from './component/header/header.component';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PaginatorComponent } from './component/paginator/paginator.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@NgModule({
  declarations: [
    VccInputComponent,
    NavigationComponent,
    HeaderComponent,
    DropdownComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TextMaskModule,
    NzInputModule,
    NzIconModule,
    IconsProviderModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzSelectModule,
    NzPaginationModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    VccInputComponent,
    NavigationComponent,
    IconsProviderModule,
    HeaderComponent,
    DropdownComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
