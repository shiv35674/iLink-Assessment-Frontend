import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if (!this.authService.isAuthenticated()) {
      alert('Please login first!');
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
