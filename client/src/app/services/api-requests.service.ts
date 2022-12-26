import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../classes/Offer';
import { Company } from '../classes/Company';


@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {

  private baseUrl = 'http://localhost:8000/api';
  private baseUrlImages = 'http://localhost:8000';

  constructor(private http: HttpClient) { }


  getOffers(): Observable<Offer[]> {
    const url = this.baseUrl + '/offers';
    return this.http.get<Offer[]>(url);
  }

  getCompanies(): Observable<Company[]> {
    const url = this.baseUrl + '/companies';
    return this.http.get<Company[]>(url);
  }

  getImage(fileName: string): Observable<Blob> {
    const url = this.baseUrlImages + fileName;
    return this.http.get(url, { responseType: 'blob' });
  }
}
