import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetailsService } from '../../services/payment-details.service';

@Component({
  selector: 'app-paymentdetails',
  templateUrl: './paymentdetails.component.html',
  styleUrls: ['./paymentdetails.component.css'],
})
export class PaymentdetailsComponent {
  @Input() paymentMethod: any = {} as any;
  @Output() paymentDeleted: EventEmitter<number> = new EventEmitter<number>();
  @Output() paymentUpdated: EventEmitter<any> = new EventEmitter<any>();
  editMode: boolean = false;
  editedPayment: any = {};

  constructor(
    private paymentDetailsService: PaymentDetailsService,
    private toastr: ToastrService
  ) {}

  editPayment(payment: any) {
    this.editedPayment = payment;
    this.editMode = true;
  }

  saveEdit(editedPayment: any): void {
    this.paymentDetailsService.updatePayment(this.editedPayment).subscribe(
      (response) => {
        this.toastr.success('Payment detail updated successfully!');
        console.log('Payment detail updated successfully:', response);
        this.paymentMethod = { ...this.editedPayment };
        this.paymentUpdated.emit(this.editedPayment);
        this.cancelEdit();
      },
      (error) => {
        this.toastr.error('Error updating payment detail!');
        console.error('Error updating payment detail:', error);
      }
    );
  }

  cancelEdit() {
    this.editMode = false;
    this.editedPayment = {};
  }

  removePayment(index: number) {
    const payment = this.paymentMethod[index];
    const paymentID = payment.paymentId;
    console.log(paymentID);
    this.paymentDetailsService.deletePayment(paymentID).subscribe(
      () => {
        this.toastr.success('Payment removed successfully!');
        console.log('Payment removed successfully:', payment);
        this.paymentDeleted.emit(paymentID);
      },
      (error) => {
        this.toastr.error('Error removing payment');
        console.error('Error removing payment:', error);
      }
    );
  }
}
