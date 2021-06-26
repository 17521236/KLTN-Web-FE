import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { NavigationComponent } from './component/navigation/navigation.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconsProviderModule } from '../icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { DropdownComponent } from './component/dropdown/dropdown.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { PaginatorComponent } from './component/paginator/paginator.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { InputComponent } from './component/input/input.component';
import { TextareaComponent } from './component/textarea/textarea.component';
import { LoadingComponent } from './component/loading/loading.component';
import { SnackBarComponent } from './component/snack-bar/snack-bar.component';
import { SnackbarModule } from 'ngx-snackbar';
import { HeaderComponent } from './component/header/header.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ActionModalComponent } from './component/action-modal/action-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ErrorMessageValidatorComponent } from './component/error-message-validator/error-message-validator.component';
import { VndPipe } from './pipe/vnd.pipe';
import { DatePickerComponent } from './component/date-picker/date-picker.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { VehiclePipe } from './pipe/vehicle.pipe';
import { BillStatusPipe } from './pipe/bill-status.pipe';
import { BlockPipe } from './pipe/block.pipe';
import { ResidentPipe } from './pipe/resident.pipe';
import { ToastrService } from 'ngx-toastr';
import { ResidentTypePipe } from './pipe/resident-type.pipe';
import { NumberPipe } from './pipe/number.pipe';
import { UserService } from './service/user.service';
import { PaymentMethodPipe } from './pipe/payment-method.pipe';
import { AptPipe } from './pipe/apt.pipe';
@NgModule({
  declarations: [
    InputComponent,
    NavigationComponent,
    DropdownComponent,
    PaginatorComponent,
    TextareaComponent,
    LoadingComponent,
    SnackBarComponent,
    HeaderComponent,
    ActionModalComponent,
    ErrorMessageValidatorComponent,
    VndPipe,
    DatePickerComponent,
    VehiclePipe,
    BillStatusPipe,
    BlockPipe,
    ResidentPipe,
    ResidentTypePipe,
    NumberPipe,
    PaymentMethodPipe,
    AptPipe
  ],
  imports: [
    NzEmptyModule,
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
    NzPaginationModule,
    SnackbarModule.forRoot(),
    NzModalModule,
    NzDatePickerModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputComponent,
    NavigationComponent,
    IconsProviderModule,
    DropdownComponent,
    PaginatorComponent,
    TextareaComponent,
    LoadingComponent,
    SnackBarComponent,
    HeaderComponent,
    NzEmptyModule,
    ActionModalComponent,
    ErrorMessageValidatorComponent,
    VndPipe,
    DatePickerComponent,
    VehiclePipe,
    BillStatusPipe,
    BlockPipe,
    ResidentPipe,
    ResidentTypePipe,
    NumberPipe,
    PaymentMethodPipe,
    AptPipe
  ],
  providers: [ToastrService, UserService]
})
export class SharedModule { }
