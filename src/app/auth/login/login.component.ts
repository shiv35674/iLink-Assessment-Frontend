import { Component } from '@angular/core';
import { LoginForm } from '../../types/auth';
import { HttpServiceService } from '../../services/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: LoginForm = {
    username: '',
    password: '',
  };
  constructor(
    private httpService: HttpServiceService,
    private toastr: ToastrService,
    private router:Router
  ) {}
  users: any[] = [];
  async submit(): Promise<void> {
    try {
      const pass = await this.httpService.getPassword(this.form.username);
      console.log(pass);
      if (this.form.password === pass) {
        const id = await this.httpService.getUserId(this.form.username);
        sessionStorage.setItem('id', id.toString());
        sessionStorage.setItem('loggedIn',"true");
        this.toastr.success('Login successful', 'Success');
        console.log('Login successful');
        this.router.navigate(['dashboard']);
      } else {
        this.toastr.error('Invalid username or password', 'Error');
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching password:', error);
      this.toastr.error('An error occurred', 'Error');
    }
  }
}
