import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Event, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'insuranceApp';

  constructor(private router:Router,private authService:AuthService,private toastr:ToastrService) {}
  user: any;

  isAuthenticated()
  {
    return this.authService.isAuthenticated();
  }

  goToDashboard()
  {
    this.router.navigate(['dashboard']);
  }
  
  goToPayments()
  {
    this.router.navigate(['payment']);
  }
  logOut()
  {
    this.toastr.success('Successfully logged out!');
    sessionStorage.clear();
    this.router.navigate([""]);
  }
}
