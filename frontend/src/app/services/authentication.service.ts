import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:8000/api';
  private baseUrlImages = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  authenticate(header: any): Observable<any> {
    const url = this.baseUrl + '/login/';
    return this.http.post(url, header);
  }

  registerUser(header: any): Observable<any> {
    const url = this.baseUrl + '/user/register/';
    return this.http.post(url, header);
  }

  registerCompany(header: any): Observable<any> {
    const url = this.baseUrl + '/company/register/';
    return this.http.post(url, header);
  }

  loggedIn() {
    return !!sessionStorage.getItem('token');
  }

  getUserInfo() {
    let type = sessionStorage.getItem('type');

    if (type == 'company') {
      return {
        id: sessionStorage.getItem('id'),
        email: sessionStorage.getItem('email'),
        type: sessionStorage.getItem('type'),
        name: sessionStorage.getItem('name'),
        token: sessionStorage.getItem('token')
      }
    }
    else {
      return {
        id: sessionStorage.getItem('id'),
        email: sessionStorage.getItem('email'),
        type: sessionStorage.getItem('type'),
        first_name: sessionStorage.getItem('first_name'),
        last_name: sessionStorage.getItem('last_name'),
        token: sessionStorage.getItem('token')
      }
    }
  }

}
