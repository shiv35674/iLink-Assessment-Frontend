import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(
    private httpService: HttpServiceService,
    private toastr: ToastrService
  ) {}

  getPaymentMethods(id: number) {
    return this.httpService.getPayments(id);
  }

  addPayment(paymentDetail: any) {
    return this.httpService.addPayment(paymentDetail);
  }
}
