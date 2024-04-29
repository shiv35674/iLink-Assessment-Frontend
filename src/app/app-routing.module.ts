import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentGuard } from './payment/payment.guard';
import { DashboardGuard } from './dashboard/dashboard.guard';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent,canActivate:[DashboardGuard]},
  {
    path:'payment',component:PaymentComponent, canActivate:[PaymentGuard]
  },
  {path:'',component:HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
