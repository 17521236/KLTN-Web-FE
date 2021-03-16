import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarModule } from 'ngx-snackbar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HttpClientModule } from '@angular/common/http';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule,
    SnackbarModule.forRoot(),
    NzDropDownModule,
    NzIconModule.forRoot(icons),
    NzCheckboxModule,
    FormsModule,
    NzRadioModule,
    NzSelectModule,
    NzInputModule,
    HttpClientModule,
    NzSwitchModule,
    NzModalModule,
    NzPaginationModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TextMaskModule,
  ],
  exports: [
    FormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
