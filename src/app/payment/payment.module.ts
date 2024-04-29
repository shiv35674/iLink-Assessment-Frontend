import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { PaymentdetailsModule } from './paymentdetails/paymentdetails.module';
import { PaymentdetailsComponent } from './paymentdetails/paymentdetails.component';



@NgModule({
  declarations: [PaymentComponent,PaymentdetailsComponent],
  imports: [
    CommonModule
  ],
  exports:[
    PaymentComponent
  ]
})
export class PaymentModule { }
