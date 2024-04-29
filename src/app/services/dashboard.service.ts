import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private httpService: HttpServiceService,
    private toastr: ToastrService
  ) {}

  getUserData(id: number) {
    return this.httpService.getUserData(id);
  }

  getUserPolicy(id: number) {
    return this.httpService.getPolicyofUser(id);
  }

  getPolicyDetail(id: number) {
    return this.httpService.getPolicies(id);
  }
}
