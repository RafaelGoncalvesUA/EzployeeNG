import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  constructor(private http: HttpClient) { }

  getCompanies(): any {
    console.log('getCompanies() called');
    return this.http.get('http://localhost:8000/api/companies');
  }
}
