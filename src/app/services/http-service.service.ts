import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  constructor(private http: HttpClient) {}
  userCredential: any;

  async getPassword(username: string): Promise<string> {
    try {
      const data: any = await this.http
        .get(`https://localhost:7173/api/Verify/api/users/${username}/password`)
        .toPromise();
      return data.password;
    } catch (error) {
      console.error('Error fetching password:', error);
      throw error; 
    }
  }

  async getUserId(username: string): Promise<number> {
    try {
      const data: any = await this.http
        .get(`https://localhost:7173/api/Login/api/users/${username}/id`)
        .toPromise();
      return data.id;
    } catch (error) {
      console.log('Error fetching user id', error);
      throw error;
    }
  }

  getData(id: number): void {
    this.http.get(`https://localhost:7173/api/User/${id}`).subscribe(
      (data: any) => {
        this.userCredential = data;
        console.log(this.userCredential);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }
  getUserData(id: number): Observable<any> {
    return this.http.get(`https://localhost:7173/api/User/${id}`);
  }

  getPolicyofUser(id: number): Observable<any> {
    return this.http.get(`https://localhost:7173/api/UserPolicy/${id}`);
  }
  getPolicies(id: number): Observable<any> {
    return this.http.get(`https://localhost:7173/api/Policy/${id}`);
  }
  getPayments(id: number): Observable<any> {
    return this.http.get(`https://localhost:7173/api/Payment/${id}`);
  }
  addPayment(paymentDetail: any): Observable<any> {
    return this.http.post<any>('https://localhost:7173/api/Payment', paymentDetail);
  }
  deletePayment(id: number): Observable<any>{
    return this.http.delete<any>(`https://localhost:7173/api/Payment/${id}`);
  }
  updatePayment(payment:any):Observable<any>
  {
    return this.http.put('https://localhost:7173/api/Payment',payment);
  }
}
