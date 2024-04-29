import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailsService {
  constructor(
    private httpService: HttpServiceService,
    private toastr: ToastrService
  ) {}

  updatePayment(payment: any) {
    return this.httpService.updatePayment(payment);
  }

  deletePayment(paymentId: number) {
    return this.httpService.deletePayment(paymentId);
  }
}
