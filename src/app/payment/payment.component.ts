import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentMethods: any = [];
  paymentDetail: any = {
    userCardname: '',
    userCardnumber: 0,
    userCvv: 0,
    userCardvalidity: '',
  };

  @ViewChild('paymentForm', { static: false }) paymentForm!: NgForm;

  submitted: boolean = false;

  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('id');
    if (userId) {
      const id = parseInt(userId, 10);
      this.getPaymentMethods(id);
    }
  }

  getPaymentMethods(id: number): void {
    this.paymentService.getPaymentMethods(id).subscribe(
      (data: any) => {
        this.paymentMethods.push(data);
        console.log('User data:', this.paymentMethods);
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.toastr.error('Error fetching user data', 'Error');
      }
    );
  }

  submitPayment() {
    const userId = sessionStorage.getItem('id');
    if (!userId) {
      this.toastr.error('An error occurred fetching User ID');
      console.error('User ID not found in sessionStorage');
      return;
    }

    this.paymentDetail.userId = parseInt(userId, 10);
    this.submitted = true;
    this.paymentService.addPayment(this.paymentDetail).subscribe(
      (response) => {
        console.log('Payment detail added successfully:', response);
        this.paymentMethods = [];
        this.getPaymentMethods(this.paymentDetail.userId);
        this.toastr.success('Payment method added successfully!');
        this.paymentForm.resetForm();
        this.paymentDetail = {
          userCardname: '',
          userCardnumber: 0,
          userCvv: 0,
          userCardvalidity: '',
        };
        this.submitted = false;
      },
      (error) => {
        this.toastr.error('Error adding payment detail');
        console.error('Error adding payment detail:', error);
      }
    );
  }
  handlePaymentDeleted(deletedPaymentId: number): void {
    this.paymentMethods = this.paymentMethods.filter(
      (payment: any) => payment.paymentId !== deletedPaymentId
    );
    this.paymentMethods = [];
    const userid = sessionStorage.getItem('id');
    if (userid) {
      const id = parseInt(userid, 10);
      this.getPaymentMethods(id);
    }
  }

  handlePaymentUpdated(payment: any) {
    this.paymentMethods = [];
    const userid = sessionStorage.getItem('id');
    if (userid) {
      const id = parseInt(userid, 10);
      this.getPaymentMethods(id);
    }
  }
}
