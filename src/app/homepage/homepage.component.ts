import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor(private router: Router,private authService: AuthService) {}
  goToLogin() {
    this.router.navigate(['login']);
  }
  goToDashboard()
  {
    this.router.navigate(['dashboard']);
  }
  isAuthenticated()
  {
    return this.authService.isAuthenticated();
  }
}
