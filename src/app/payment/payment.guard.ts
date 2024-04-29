import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class PaymentGuard implements CanActivate {
  constructor(private authService: AuthService, private router:Router) {}

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      alert('Please login first!');
      this.router.navigate(['']);
      return false;
      
    }
    return true;
  }
}
