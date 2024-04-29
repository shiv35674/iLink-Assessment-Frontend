import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  userCredential: any = [];
  userPolicyDetail: any = [];
  policyDetails: any = [];

  ngOnInit(): void {
    const userId = sessionStorage.getItem('id');
    if (userId) {
      const id = parseInt(userId, 10);
      this.getUserData(id);
      this.getUserPolicy(id);
    } else {
      console.error('User ID not found in session storage');
      this.toastr.error('User ID not found in session storage', 'Error');
    }
  }

  goToPayment() {
    this.router.navigate(['payment']);
  }

  getUserData(id: number): void {
    this.dashboardService.getUserData(id).subscribe(
      (data: any) => {
        this.userCredential = data;
        console.log('User data:', this.userCredential);
      },
      (error) => {
        console.error('Error fetching user data:', error);
        this.toastr.error('Error fetching user data', 'Error');
      }
    );
  }

  getUserPolicy(id: number): void {
    this.dashboardService.getUserPolicy(id).subscribe(
      (dataArray: any[]) => {
        dataArray.forEach((data) => {
          const policyId = data.policyId;
          if (policyId !== undefined) {
            if (
              !this.policyDetails.some(
                (policy: any) => policy.policyId === policyId
              )
            ) {
              this.getPolicyDetail(policyId);
            }
            this.userPolicyDetail.push(data);
          } else {
            console.error('PolicyId is undefined in the response:', data);
            this.toastr.error('PolicyId is undefined in the response', 'Error');
          }
        });
        console.log('User Policy data:', this.userPolicyDetail);
      },
      (error) => {
        console.error('Error fetching user policy data:', error);
        this.toastr.error('Error fetching user policy data', 'Error');
      }
    );
  }

  getPolicyDetail(id: number): void {
    this.dashboardService.getPolicyDetail(id).subscribe(
      (data: any) => {
        this.policyDetails.push(data);
        console.log('Policy data:', this.policyDetails);
      },
      (error) => {
        console.error('Error fetching policy data:', error);
        this.toastr.error('Error fetching policy data', 'Error');
      }
    );
  }
}
