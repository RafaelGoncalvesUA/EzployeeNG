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


  getOffers(args?: any): Observable<Offer[]> {
    const url = this.baseUrl + '/offers';

    if (args)
      return this.http.get<Offer[]>(url, { params: args });
    return this.http.get<Offer[]>(url);
  }

  getOfferById(id: number): Observable<Offer> {
    const url = this.baseUrl + '/offers?id=' + id;
    return this.http.get<Offer>(url);
  }

  getOffersByCompany(id: number): Observable<Offer[]> {
    const url = this.baseUrl + '/offers?company=' + id;
    return this.http.get<Offer[]>(url);
  }

  getCompanies(args?: any): Observable<Company[]> {
    const url = this.baseUrl + '/companies';

    if (args)
      return this.http.get<Company[]>(url, { params: args });
    return this.http.get<Company[]>(url);
  }

  getCompanyById(id: number): Observable<Company> {
    const url = this.baseUrl + '/companies?id=' + id;
    return this.http.get<Company>(url);
  }

  getImage(fileName: string): Observable<Blob> {
    const url = this.baseUrlImages + fileName;
    return this.http.get(url, { responseType: 'blob' });
  }

  getUserById(id: number): Observable<any> {
    const url = this.baseUrl + '/user/account?id=' + id;
    return this.http.get(url);
  }

  getCompanyDetailsById(id: number): Observable<any> {
    const url = this.baseUrl + '/company/account?id=' + id;
    return this.http.get(url);
  }

  addOffer(offer): Observable<any> {
    const url = this.baseUrl + '/offers/';
    return this.http.post(url, offer);
  }

  updateOffer(offerId, offer): Observable<any> {
    const url = this.baseUrl + '/offers/?id=' + offerId;
    return this.http.put(url, offer);
  }

  deleteOffer(offerId): Observable<any> {
    const url = this.baseUrl + '/offers/?id=' + offerId;
    return this.http.delete(url);
  }

  favCompany(companyId, userId): Observable<any> {
    const url = this.baseUrl + '/favs/companies/';
    return this.http.post(url, {"company_id": companyId, "user_id": userId});
  }

  unfavCompany(companyId, userId): Observable<any> {
    const url = this.baseUrl + '/favs/companies/';
    return this.http.delete(url, { body: {"company_id": companyId, "user_id": userId} });
  }

  favOffer(offerId, userId): Observable<any> {
    const url = this.baseUrl + '/favs/offers/';
    return this.http.post(url, {"offer_id": offerId, "user_id": userId});
  }

  unfavOffer(offerId, userId): Observable<any> {
    const url = this.baseUrl + '/favs/offers/';
    return this.http.delete(url, { body: {"offer_id": offerId, "user_id": userId} });
  }

  getFavCompanies(userId): Observable<any> {
    const url = this.baseUrl + '/favs/companies/?id=' + userId;
    return this.http.get(url);
  }

  getFavOffers(userId): Observable<any> {
    const url = this.baseUrl + '/favs/offers/?id=' + userId;
    return this.http.get(url);
  }

}
